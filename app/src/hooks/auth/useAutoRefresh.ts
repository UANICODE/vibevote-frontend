import { useEffect } from 'react';
import { tokenService } from '@/services/auth/TokenService';

export const useAutoRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const refreshed = await tokenService.refresh();
        console.log('Tokens renovados automaticamente', refreshed);
      } catch (error) {
        console.error('Falha no refresh automático:', error);
      }
    }, 30 * 60 * 1000); // 30 minutos

    return () => clearInterval(interval);
  }, []);
};
