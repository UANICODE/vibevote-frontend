// services/auth/login/loginService.ts
import { LoginCredentials, LoginResponseDTO } from '@/types/auth/auth';
import { apiClient } from '@/lib/axios/index';
import { tokenStorageService } from '@/services/auth/storage/TokenStorageService';

class LoginService {
  async execute(credentials: LoginCredentials): Promise<LoginResponseDTO> {
    const response = await apiClient.post<LoginResponseDTO>(
      '/api/auth/user/login',
      credentials
    );
    return response.data;
  }

  validateAllowedRole(roles: string[]): void {
    const allowedRoles = ['ADMIN', 'ENTIDADE', 'CONCORRENTE'];

    const hasAccess = roles.some(role => allowedRoles.includes(role));

    !hasAccess && this.throwAccessError();
  }

  handleSuccessfulLogin(data: LoginResponseDTO): void {
    this.validateAllowedRole(data.roles);

    tokenStorageService.setTokens(
      data.accessToken,
      data.refreshToken
    );
  }

  private throwAccessError(): never {
    throw new Error('Acesso permitido apenas para usuários autorizados');
  }
}

export const loginService = new LoginService();
