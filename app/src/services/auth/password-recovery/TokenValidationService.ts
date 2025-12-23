import { apiClient } from '@/lib/axios';
import { PasswordRecoveryResponse } from '@/types/auth/password-recovery';

export class TokenValidationService {
  async validateToken(token: string): Promise<PasswordRecoveryResponse> {
    try {
      const response = await apiClient.get<PasswordRecoveryResponse>(
        '/api/auth/password/validate-token',
        { params: { token } }
      );

      return response.data;
    } catch (error: any) {
      console.error('🚨 Erro validateToken:', error);
      throw new Error(
        error.response?.data?.message || 'Token inválido ou expirado.'
      );
    }
  }
}

export const tokenValidationService = new TokenValidationService();
