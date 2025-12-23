// hooks/auth/useLogout.ts
import { useState } from 'react';
import { logoutService } from '@/services/auth/LogoutService';

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const useLogout = (): UseLogoutReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      await logoutService.execute();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};