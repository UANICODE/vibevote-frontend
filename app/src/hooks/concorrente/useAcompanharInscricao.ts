// hooks/concorrente/useAcompanharInscricao.ts
import { useState, useEffect } from 'react';
import { ConcorrentePerfilResponseDTO, AcompanhamentoError } from '../../types/acompanhamento';
import { consultarInscricao } from '../../services/concorrente/acompanhamentoService.ts';

interface UseAcompanharInscricaoReturn {
  perfil: ConcorrentePerfilResponseDTO | null;
  isLoading: boolean;
  error: AcompanhamentoError | null;
  refetch: () => Promise<void>;
}

export function useAcompanharInscricao(): UseAcompanharInscricaoReturn {
  const [perfil, setPerfil] = useState<ConcorrentePerfilResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AcompanhamentoError | null>(null);

  const fetchInscricao = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await consultarInscricao();
      setPerfil(data);
    } catch (err: any) {
      const errorData: AcompanhamentoError = {
        message: err.response?.data?.message || 'Erro ao carregar informações da inscrição',
        status: err.response?.status
      };
      setError(errorData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInscricao();
  }, []);

  return {
    perfil,
    isLoading,
    error,
    refetch: fetchInscricao
  };
}