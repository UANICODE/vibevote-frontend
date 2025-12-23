// types/concurso.ts
export interface ConcursoDTO {
  id: number;
  nome: string;
  descricao: string;
  valorMinimoVoto: number;
  tipoConcurso: string;
  estado: string;
  dataInicioVotacao: string;
  dataFimVotacao: string;
}


export type ConcursoTipo = 'MUSICA' | 'DJ' | 'KARAOKE' | 'OUTRO';

export interface ConcursoFilter {
  estado?: ConcursoEstado;
  tipo?: ConcursoTipo;
  dataInicio?: string;
  dataFim?: string;
}


// types/concurso.ts
export type ConcursoEstado = 'ABERTO' | 'PENDENTE' | 'ENCERRADO';
export type TipoConcurso = 'DJ' | 'KARAOKE';



export interface ConcursoRequestDTO {
  nome: string;
  descricao: string;
  valorMinimoVoto: number;
  tipoConcurso: TipoConcurso;
  dataInicioVotacao: string; // ISO string
  dataFimVotacao: string; // ISO string
}

export interface ConcursoResponseDTO {
  id: number;
  nome: string;
  descricao: string;
  valorMinimoVoto: number;
  tipoConcurso: TipoConcurso;
  estado: ConcursoEstado;
  dataInicioVotacao: string;
  dataFimVotacao: string;
}

export interface CriarConcursoError {
  message: string;
  field?: string;
  errors?: Record<string, string[]>;
}