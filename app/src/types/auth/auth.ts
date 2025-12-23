// types/auth.ts
export type UserRole = 'CONCORRENTE' | 'ENTIDADE';;

export interface AuthUser {
  uid: string;
  email: string;
  roles: UserRole[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  roles: string[];
  uid: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  isLoading: boolean;
  loginError: string;
  isAuthenticated: boolean;
}