// types/concurso/marcarAberto.ts
export interface MarcarConcursoAbertoRequestDTO {
  concursoId: number;
}

export interface MarcarConcursoAbertoResponseDTO {
  id: number;
  nome: string;
  estado: string;
  mensagem: string;
  atualizadoEm: string;
}

export interface MarcarConcursoAbertoError {
  message: string;
  status?: number;
  field?: string;
}