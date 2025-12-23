// services/auth/logout/logoutService.ts
import { apiClient } from '@/lib/axios';
import { tokenStorageService } from '@/services/auth/storage/TokenStorageService';

class LogoutService {
  async execute(): Promise<void> {
    await apiClient.post('/api/auth/logout');
    tokenStorageService.clearTokens();
  }
}

export const logoutService = new LogoutService();