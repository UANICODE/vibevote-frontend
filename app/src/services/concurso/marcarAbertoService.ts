// services/concurso/marcarAbertoService.ts
import { MarcarConcursoAbertoRequestDTO, MarcarConcursoAbertoResponseDTO } from '../../types/marcarAberto';
import { apiClient } from '@/lib/axios';

/**
 * Marca um concurso como ABERTO
 */
export const marcarConcursoAberto = async (
  concursoId: number
): Promise<MarcarConcursoAbertoResponseDTO> => {
  const response = await apiClient.post<MarcarConcursoAbertoResponseDTO>(
    `/api/entidade/concursos/${concursoId}/abrir`,
    { concursoId }
  );
  return response.data;
};