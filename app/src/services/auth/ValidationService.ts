// services/auth/validation/validationService.ts
import { tokenService } from '@/services/auth/TokenService';

class ValidationService {
  async validateToken(): Promise<boolean> {
    return tokenService.validate();
  }

  async validateAndRefreshIfNeeded(): Promise<boolean> {
    const isValid = await this.validateToken();
    
    isValid && console.log('Token válido');
    !isValid && await this.attemptTokenRefresh();
    
    return this.validateToken();
  }

  private async attemptTokenRefresh(): Promise<void> {
    console.log('Token inválido, tentando renovar...');
    await tokenService.refresh();
  }
}

export const validationService = new ValidationService();