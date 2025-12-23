// services/concorrente/concorrenteService.ts
import { ConcorrenteDTO, AtualizarEstadoDTO, AtualizarEstadoResponseDTO } from '@/types/concorrente';
import { apiClient } from '@/lib/axios';

/**
 * Aprova ou rejeita um concorrente
 */
export const atualizarEstadoConcorrente = async (
  concursoId: number, 
  concorrenteId: string, 
  estado: AtualizarEstadoDTO
): Promise<AtualizarEstadoResponseDTO> => {
  const response = await apiClient.put<AtualizarEstadoResponseDTO>(
    `/api/entidade/concursos/${concursoId}/concorrentes/${concorrenteId}/estado`,
    estado
  );
  return response.data;
};