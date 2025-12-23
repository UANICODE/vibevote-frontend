// hooks/concurso/useMarcarConcursoAberto.ts
import { useState } from 'react';
import { MarcarConcursoAbertoResponseDTO, MarcarConcursoAbertoError } from '../../types/marcarAberto';
import { marcarConcursoAberto } from '../../services/concurso/marcarAbertoService';

interface UseMarcarConcursoAbertoReturn {
  marcar: (concursoId: number) => Promise<MarcarConcursoAbertoResponseDTO | undefined>;
  isLoading: boolean;
  error: MarcarConcursoAbertoError | null;
  success: MarcarConcursoAbertoResponseDTO | null;
  clear: () => void;
}

export function useMarcarConcursoAberto(): UseMarcarConcursoAbertoReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<MarcarConcursoAbertoError | null>(null);
  const [success, setSuccess] = useState<MarcarConcursoAbertoResponseDTO | null>(null);

  const clear = () => {
    setError(null);
    setSuccess(null);
  };

  const marcar = async (concursoId: number): Promise<MarcarConcursoAbertoResponseDTO | undefined> => {
    setIsLoading(true);
    clear();

    try {
      const response = await marcarConcursoAberto(concursoId);
      setSuccess(response);
      return response;
    } catch (err: any) {
      const errorData: MarcarConcursoAbertoError = {
        message: err.response?.data?.message || 'Erro ao abrir inscrições do concurso',
        status: err.response?.status,
        field: err.response?.data?.field
      };
      setError(errorData);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    marcar,
    isLoading,
    error,
    success,
    clear
  };
}