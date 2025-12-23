// services/auth/storage/tokenStorageService.ts
import { AUTH_KEYS } from '@/constants/auth/auth';

class TokenStorageService {
  setTokens(accessToken: string, refreshToken: string): void {
    this.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken);
    this.setItem(AUTH_KEYS.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null {
    return this.getItem(AUTH_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return this.getItem(AUTH_KEYS.REFRESH_TOKEN);
  }

  clearTokens(): void {
    this.removeItem(AUTH_KEYS.ACCESS_TOKEN);
    this.removeItem(AUTH_KEYS.REFRESH_TOKEN);
  }

  hasTokens(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }

  private getItem(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setItem(key: string, value: string): void {
    typeof window !== 'undefined' && localStorage.setItem(key, value);
  }

  private removeItem(key: string): void {
    typeof window !== 'undefined' && localStorage.removeItem(key);
  }
}

export const tokenStorageService = new TokenStorageService();