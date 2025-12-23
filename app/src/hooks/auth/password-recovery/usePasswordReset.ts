// hooks/auth/use-password-reset.ts
import { useMutation } from '@tanstack/react-query';
import { passwordResetService } from '@/services/auth/password-recovery/PasswordResetService';

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: passwordResetService.resetPassword,
  });
};