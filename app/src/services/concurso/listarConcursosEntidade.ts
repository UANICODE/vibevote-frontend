// services/concurso/concursoService.ts
import { ConcursoDTO } from '@/types/concurso';
import { apiClient } from '@/lib/axios';

/**
 * Lista todos os concursos da entidade autenticada
 * O token JWT é enviado automaticamente via interceptor do axios
 */
export const listarConcursosEntidade = async (): Promise<ConcursoDTO[]> => {
  const response = await apiClient.get<ConcursoDTO[]>('/api/entidade/concursos/listar');
  return response.data;
};