// services/concurso/concursoService.ts

import { apiClient } from '@/lib/axios';
import { ConcursoRequestDTO, ConcursoResponseDTO } from '@/types/concurso/concurso';

/**
 * Cria um novo concurso
 */
export const criarConcurso = async (dados: ConcursoRequestDTO): Promise<ConcursoResponseDTO> => {
  const response = await apiClient.post<ConcursoResponseDTO>('/api/concursos/criar', dados);
  return response.data;
};

