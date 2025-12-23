// types/concorrente.ts
export interface ConcorrenteDTO {
  userId: string;
  nome: string;
  email: string;
  estado: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  fotoPerfil: string;
  telefone?: string;
}

export interface AtualizarEstadoDTO {
  estado: 'APROVADO' | 'REJEITADO';
}

export interface AtualizarEstadoResponseDTO {
  concorrenteId: string;
  estadoAtual: string;
}