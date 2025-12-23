// hooks/auth/useAuthGuard.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth/AuthProvider';

interface UseAuthGuardReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthGuard = (redirectTo: string = '/auth'): UseAuthGuardReturn => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Aguarda a verificação inicial da autenticação
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const shouldRedirect = !authLoading && !isAuthenticated;
      
      shouldRedirect && router.push(redirectTo);
      setIsChecking(false);
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, authLoading, router, redirectTo]);

  return { 
    isAuthenticated, 
    isLoading: authLoading || isChecking 
  };
};