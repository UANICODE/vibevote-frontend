'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthUser, AuthTokens, AuthContextType } from '@/types/auth/auth';
import { useLogin } from '@/hooks/auth/useLogin';
import { useLogout } from '@/hooks/auth/useLogout';
import { tokenService } from '@/services/auth/TokenService';
import { useAutoRefresh } from '@/hooks/auth/useAutoRefresh';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { login: loginHook, isLoading: loginLoading, error: loginError } = useLogin();
  const { logout: logoutHook, isLoading: logoutLoading } = useLogout();

  // ✅ Hook para auto refresh em background
  useAutoRefresh();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async (): Promise<void> => {
    try {
      if (!tokenService.hasValidTokens()) {
        setIsAuthenticated(false);
        return;
      }

      const accessToken = tokenService.getStoredTokens().accessToken;
      if (accessToken) {
        setUser({
          uid: 'admin-user-id',
          email: 'admin@foodnect.com',
          roles: ['ADMIN'],
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      tokenService.clearTokens();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { user: newUser, tokens: newTokens } = await loginHook(email, password);
      tokenService.setTokens(newTokens.accessToken, newTokens.refreshToken);
      setUser(newUser);
      setTokens(newTokens);
      setIsAuthenticated(true);
    } catch (error) {
      tokenService.clearTokens();
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutHook();
    } finally {
      tokenService.clearTokens();
      setUser(null);
      setTokens(null);
      setIsAuthenticated(false);
    }
  };

  const refreshTokens = async (): Promise<void> => {
    try {
      const newTokens = await tokenService.refresh();
      setTokens(newTokens);
      console.log('Tokens renovados com sucesso');
    } catch (error) {
      console.error('Erro ao renovar tokens:', error);
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    tokens,
    login,
    logout,
    refreshTokens,
    isLoading: isLoading || loginLoading || logoutLoading,
    loginError,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context as AuthContextType;
};
