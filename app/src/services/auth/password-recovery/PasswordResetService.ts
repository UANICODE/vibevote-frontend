// services/auth/password-recovery/PasswordResetService.ts
import { apiClient } from '@/lib/axios';
import { 
  PasswordResetRequest, 
  PasswordRecoveryResponse 
} from '@/types/auth/password-recovery';

export class PasswordResetService {

  async resetPassword(request: PasswordResetRequest): Promise<PasswordRecoveryResponse> {
    try {
      const { confirmPassword, ...payload } = request;
      const response = await apiClient.post<PasswordRecoveryResponse>(
        `/reset-password`,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Falha ao redefinir senha. Tente novamente.'
      );
    }
  }
}

export const passwordResetService = new PasswordResetService();