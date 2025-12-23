// services/public/concursoPublicoService.ts
import { ConcursoPublicoDTO } from '../../types/concurso//concursoPublico';
import { apiClient } from '@/lib/axios';

/**
 * Lista todos os concursos públicos disponíveis
 */
export const listarConcursosPublicos = async (): Promise<ConcursoPublicoDTO[]> => {
  const response = await apiClient.get<ConcursoPublicoDTO[]>('/api/public/concursos/listar');
  return response.data;
};

