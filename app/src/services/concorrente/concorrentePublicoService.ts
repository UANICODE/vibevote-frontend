// services/public/concorrentePublicoService.ts
import { ConcorrenteRequestDTO, ConcorrenteResponseDTO } from '../../types/concorrentePublico';
import { apiClient } from '@/lib/axios';

/**
 * Cadastra um novo concorrente
 */
export const cadastrarConcorrente = async (dados: ConcorrenteRequestDTO): Promise<ConcorrenteResponseDTO> => {
  const response = await apiClient.post<ConcorrenteResponseDTO>('/api/concorrentes/cadastrar', dados);
  return response.data;
};

