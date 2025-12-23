// hooks/public/useConcursosPublicos.ts
import { useState, useEffect } from 'react';
import { ConcursoPublicoDTO } from '../../types/concurso/concursoPublico';
import { listarConcursosPublicos } from '../../services/concurso/concursoPublicoService';

interface UseConcursosPublicosReturn {
  concursos: ConcursoPublicoDTO[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  concursosAtivos: ConcursoPublicoDTO[];
}

export function useConcursosPublicos(): UseConcursosPublicosReturn {
  const [concursos, setConcursos] = useState<ConcursoPublicoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConcursos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await listarConcursosPublicos();
      setConcursos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar concursos');
      console.error('Erro ao buscar concursos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConcursos();
  }, []);

  // Filtra apenas concursos ativos (ABERTO)
  const concursosAtivos = concursos.filter(concurso => concurso.estado === 'ABERTO');

  return {
    concursos,
    isLoading,
    error,
    refetch: fetchConcursos,
    concursosAtivos
  };
}