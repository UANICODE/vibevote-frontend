// hooks/concurso/useCriarConcurso.ts
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { criarConcurso } from '@/services/concurso/criarConcurso';
import { ConcursoRequestDTO, ConcursoResponseDTO, CriarConcursoError } from '@/types/concurso/concurso';

interface UseCriarConcursoReturn {
  criar: (dados: ConcursoRequestDTO) => Promise<ConcursoResponseDTO | undefined>;
  isLoading: boolean;
  error: CriarConcursoError | null;
  clearError: () => void;
}

export function useCriarConcurso(): UseCriarConcursoReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CriarConcursoError | null>(null);
  const router = useRouter();

  const clearError = () => setError(null);

  const criar = async (dados: ConcursoRequestDTO): Promise<ConcursoResponseDTO | undefined> => {
    setIsLoading(true);
    clearError();

    try {
      const response = await criarConcurso(dados);
      
      // Redireciona para o dashboard após sucesso
      setTimeout(() => {
        router.push('/entidade');
        router.refresh();
      }, 1500);
      
      return response;
    } catch (err: any) {
      const errorData: CriarConcursoError = {
        message: err.response?.data?.message || 'Erro ao criar concurso',
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
    criar,
    isLoading,
    error,
    clearError
  };
}