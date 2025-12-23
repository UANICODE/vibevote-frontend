// lib/axios.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenService } from '@/services/auth/TokenService';
import { tokenStorageService } from '@/services/auth/storage/TokenStorageService';

class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://vibevote.uanicode.com',
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      this.setupInterceptors();
    }
    return ApiClient.instance;
  }

  private static setupInterceptors(): void {
    // Request interceptor - adiciona access token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = tokenStorageService.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor - refresh automático em 401
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Tratamento para erro 401 - Token expirado
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newTokens = await tokenService.refresh();
            originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError: unknown) {
  tokenStorageService.clearTokens();

  if (typeof window !== 'undefined') {
    window.location.href = '/auth';
  }

  // Garantir tipo AxiosError antes de normalizar
  const axiosError = refreshError as AxiosError;

  return Promise.reject(this.normalizeError(axiosError));
}

        }

        // Tratamento para erro 404 - Recurso não encontrado
        if (error.response?.status === 404) {
          console.warn('Recurso não encontrado:', error.config?.url);
        }

        // Tratamento para erro 500 - Erro interno do servidor
        if (error.response?.status === 500) {
          console.error('Erro interno do servidor:', error);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private static normalizeError(error: AxiosError): Error {
    if (error.response?.data) {
      const data = error.response.data as any;
      return new Error(data.message || data.error || 'Erro desconhecido');
    }
    
    if (error.request) {
      return new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    
    return new Error(error.message || 'Ocorreu um erro inesperado');
  }

  static clearAuth(): void {
    tokenStorageService.clearTokens();
  }
}

export const apiClient = ApiClient.getInstance();