// constants/auth.ts
export const AUTH_KEYS = {
  ACCESS_TOKEN: 'admin-token',
  REFRESH_TOKEN: 'admin-refresh-token',
} as const;

export const AUTH_ERRORS = {
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Acesso não autorizado.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  INVALID_CREDENTIALS: 'Credenciais inválidas.',
  ESTABLISHMENT_PENDING: 'Estabelecimento ainda não aprovado pelo administrador.',
  TOKEN_REFRESH_FAILED: 'Falha ao renovar sessão.',
} as const;