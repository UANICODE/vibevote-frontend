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

export type ConcursoEstado = 'ABERTO' | 'PENDENTE' | 'ENCERRADO';
export type ConcursoTipo = 'MUSICA' | 'DANCA' | 'ARTE' | 'OUTRO';

export interface ConcursoFilter {
  estado?: ConcursoEstado;
  tipo?: ConcursoTipo;
  dataInicio?: string;
  dataFim?: string;
}