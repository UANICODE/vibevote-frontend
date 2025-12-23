// hooks/auth/useRedirectAfterLogin.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth/AuthProvider';

export function useRedirectAfterLogin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Pequeno delay para garantir que tudo está carregado
      const timer = setTimeout(() => {
        if (user.roles.includes('ENTIDADE')) {
          router.push('/entidade');
        } else if (user.roles.includes('CONCORRENTE')) {
          router.push('/acompanhamento');

        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, router]);

  return null;
}