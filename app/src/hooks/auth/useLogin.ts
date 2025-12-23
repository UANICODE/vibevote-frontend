// hooks/auth/useLogin.ts
import { useState } from 'react';
import { AuthUser, AuthTokens, UserRole } from '@/types/auth/auth';
import { loginService } from '@/services/auth/LoginService';

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<{ user: AuthUser; tokens: AuthTokens }>;
  isLoading: boolean;
  error: string;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await loginService.execute({ email, password });
      loginService.handleSuccessfulLogin(data);

      const user: AuthUser = {
        uid: data.uid,
        email,
        roles: data.roles as UserRole[],
      };

      const tokens: AuthTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      return { user, tokens };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};