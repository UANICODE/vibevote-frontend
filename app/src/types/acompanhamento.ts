// types/concorrente/acompanhamento.ts
export interface ConcorrentePerfilResponseDTO {
  id: string;
  nome: string;
  email: string;
  fotoPerfil?: string;
  estado: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
}

export interface AcompanhamentoError {
  message: string;
  status?: number;
}