// hooks/useConcursosEntidade.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConcursoDTO } from '@/types/concurso';
import { listarConcursosEntidade } from '../../services/concurso/listarConcursosEntidade';

interface UseConcursosEntidadeReturn {
  concursos: ConcursoDTO[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useConcursosEntidade = (): UseConcursosEntidadeReturn => {
  const [concursos, setConcursos] = useState<ConcursoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConcursos = useCallback(async (): Promise<void> => {
    if (!isLoading) setIsLoading(true);
    setError(null);
    
    try {
      const data = await listarConcursosEntidade();
      setConcursos(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar concursos');
      console.error('[useConcursosEntidade] Erro:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConcursos();
  }, [fetchConcursos]);

  return {
    concursos,
    isLoading,
    error,
    refetch: fetchConcursos,
  };
};