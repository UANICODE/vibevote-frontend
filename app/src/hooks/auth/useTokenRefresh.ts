// hooks/auth/useTokenRefresh.ts
import { useState } from 'react';
import { tokenService } from '@/services/auth/TokenService';

interface UseTokenRefreshReturn {
  refreshTokens: () => Promise<void>;
  isLoading: boolean;
  error: string;
}

export const useTokenRefresh = (): UseTokenRefreshReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshTokens = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      await tokenService.refresh();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { refreshTokens, isLoading, error };
};