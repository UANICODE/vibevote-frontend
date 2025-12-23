// hooks/auth/use-token-validation.ts
import { useMutation } from '@tanstack/react-query';
import { tokenValidationService } from '@/services/auth/password-recovery/TokenValidationService';

export const useTokenValidation = () => {
  return useMutation({
    mutationFn: tokenValidationService.validateToken,
  });
};