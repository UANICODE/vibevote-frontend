// services/auth/token/TokenService.ts
import { AuthTokens } from '@/types/auth/auth';
import { apiClient } from '@/lib/axios';
import { tokenStorageService } from '@/services/auth/storage/TokenStorageService';

class TokenService {
  async refresh(): Promise<AuthTokens> {
    const refreshToken = tokenStorageService.getRefreshToken();
    
    const response = await apiClient.post<AuthTokens>('/api/auth/refresh', {}, {
      headers: { 'X-Refresh-Token': refreshToken! }
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    tokenStorageService.setTokens(accessToken, newRefreshToken || refreshToken!);

    return { accessToken, refreshToken: newRefreshToken || refreshToken! };
  }

  async validate(): Promise<boolean> {
    const accessToken = tokenStorageService.getAccessToken();
    
    const response = await apiClient.get('/api/auth/validate', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    return response.status === 200;
  }

  getStoredTokens() {
    return {
      accessToken: tokenStorageService.getAccessToken(),
      refreshToken: tokenStorageService.getRefreshToken()
    };
  }

  clearTokens(): void {
    tokenStorageService.clearTokens();
  }

  hasValidTokens(): boolean {
    return tokenStorageService.hasTokens();
  }

  // 👇 Adicione este método
  setTokens(accessToken: string, refreshToken: string): void {
    tokenStorageService.setTokens(accessToken, refreshToken);
  }
}

export const tokenService = new TokenService();
