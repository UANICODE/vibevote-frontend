// types/public/concursoPublico.ts
export interface ConcursoPublicoDTO {
  id: number;
  nome: string;
  descricao: string;
  tipoConcurso: string;
  estado: string;
  dataInicioVotacao: string;
  dataFimVotacao: string;
  nomeEntidade: string;
}

export interface ConcursoPublicoFiltros {
  tipoConcurso?: string;
  estado?: string;
  search?: string;
}