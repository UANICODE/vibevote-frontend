// hooks/public/useCadastrarConcorrente.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConcorrenteRequestDTO, ConcorrenteResponseDTO, CadastrarConcorrenteError } from '../../types/concorrentePublico';
import { cadastrarConcorrente } from '../../services/concorrente/concorrentePublicoService';

interface UseCadastrarConcorrenteReturn {
  cadastrar: (dados: ConcorrenteRequestDTO) => Promise<ConcorrenteResponseDTO | undefined>;
  isLoading: boolean;
  error: CadastrarConcorrenteError | null;
  clearError: () => void;
}

export function useCadastrarConcorrente(): UseCadastrarConcorrenteReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CadastrarConcorrenteError | null>(null);
  const router = useRouter();

  const clearError = () => setError(null);

  const cadastrar = async (dados: ConcorrenteRequestDTO): Promise<ConcorrenteResponseDTO | undefined> => {
    setIsLoading(true);
    clearError();

    try {
      const response = await cadastrarConcorrente(dados);
      return response;
    } catch (err: any) {
      const errorData: CadastrarConcorrenteError = {
        message: err.response?.data?.message || 'Erro ao realizar inscrição',
        field: err.response?.data?.field,
        errors: err.response?.data?.errors
      };
      setError(errorData);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cadastrar,
    isLoading,
    error,
    clearError
  };
}