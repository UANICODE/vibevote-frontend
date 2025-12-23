// services/concorrente/acompanhamentoService.ts
import { ConcorrentePerfilResponseDTO } from '../../types/acompanhamento';
import { apiClient } from '@/lib/axios';

/**
 * Consulta o perfil e estado da inscrição do concorrente logado
 */
export const consultarInscricao = async (): Promise<ConcorrentePerfilResponseDTO> => {
  const response = await apiClient.get<ConcorrentePerfilResponseDTO>('/api/concorrente/inscricao/acompanhar');
  return response.data;
};