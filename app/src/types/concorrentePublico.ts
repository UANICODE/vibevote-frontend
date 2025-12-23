// types/public/concorrentePublico.ts
export interface ConcorrenteRequestDTO {
  nome: string;
  email: string;
  password: string;
  fotoPerfil?: string;
  telefone?: string;
  endereco?: string;
  concursoId: number;
}

export interface ConcorrenteResponseDTO {
  userId: string;
  nome: string;
  email: string;
  estado: string;
  criadoEm: string;
  fotoPerfil?: string;
  concursoId: number;
}

export interface CadastrarConcorrenteError {
  message: string;
  field?: string;
  errors?: Record<string, string[]>;
}