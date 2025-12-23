// services/concorrente/concorrenteService.ts
import { ConcorrenteDTO, AtualizarEstadoDTO, AtualizarEstadoResponseDTO } from '@/types/concorrente';
import { apiClient } from '@/lib/axios';

/**
 * Lista todos os concorrentes inscritos em um concurso específico
 */
export const listarConcorrentesConcurso = async (concursoId: number): Promise<ConcorrenteDTO[]> => {
  const response = await apiClient.get<ConcorrenteDTO[]>(`/api/entidade/concursos/${concursoId}/concorrentes`);
 
  return response.data;
};

