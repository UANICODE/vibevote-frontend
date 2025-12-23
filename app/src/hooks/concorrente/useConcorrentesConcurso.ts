// hooks/concorrente/useConcorrentesConcurso.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConcorrenteDTO } from '@/types/concorrente';
import { listarConcorrentesConcurso } from '../../services/concorrente/listarConcorrentesConcurso';

interface UseConcorrentesConcursoReturn {
  concorrentes: ConcorrenteDTO[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useConcorrentesConcurso = (concursoId: number): UseConcorrentesConcursoReturn => {
  const [concorrentes, setConcorrentes] = useState<ConcorrenteDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConcorrentes = useCallback(async (): Promise<void> => {
    if (!isLoading) setIsLoading(true);
    setError(null);
    
    try {
      const data = await listarConcorrentesConcurso(concursoId);
      setConcorrentes(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar concorrentes');
      console.error('[useConcorrentesConcurso] Erro:', err);
    } finally {
      setIsLoading(false);
    }
  }, [concursoId]);

  useEffect(() => {
    if (concursoId) {
      fetchConcorrentes();
    }
  }, [concursoId, fetchConcorrentes]);

  return {
    concorrentes,
    isLoading,
    error,
    refetch: fetchConcorrentes,
  };
};