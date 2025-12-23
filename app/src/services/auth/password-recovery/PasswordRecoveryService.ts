// services/auth/password-recovery/PasswordRecoveryService.ts
import { apiClient } from '@/lib/axios';
import { 
  PasswordRecoveryResponse 
} from '@/types/auth/password-recovery';

export class PasswordRecoveryService {
  private readonly basePath = '/api/auth/password';

  async requestPasswordRecovery(email: string): Promise<PasswordRecoveryResponse> {
    try {
      const response = await apiClient.post<PasswordRecoveryResponse>(
        `${this.basePath}/recovery`,
        { email }
      );
      return response.data;
    } catch (error: any) {
      // 🔥 CAPTURA ESPECÍFICA da mensagem de erro da API
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Erro ao processar solicitação. Tente novamente.';
      throw new Error(errorMessage);
    }
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();