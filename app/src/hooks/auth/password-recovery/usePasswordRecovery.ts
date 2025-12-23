// hooks/auth/password-recovery/usePasswordRecovery.ts
import { useMutation } from '@tanstack/react-query';
import { passwordRecoveryService } from '@/services/auth/password-recovery/PasswordRecoveryService';
import { useState } from 'react';

interface PasswordRecoveryResponse {
  success: boolean;
  message: string;
}

export const usePasswordRecovery = () => {
  const [lastAttemptEmail, setLastAttemptEmail] = useState<string>('');
  const [emailWasSent, setEmailWasSent] = useState<boolean>(false);

  const mutation = useMutation<PasswordRecoveryResponse, Error, string>({
    mutationFn: async (email: string) => {
      setLastAttemptEmail(email);
      const response = await passwordRecoveryService.requestPasswordRecovery(email);
      
      // Armazena se o email foi realmente enviado
      setEmailWasSent(response.success);
      
      return response;
    },
  });

  return {
    ...mutation,
    lastAttemptEmail,
    emailWasSent,
    // Helper para verificar se foi sucesso real (email enviado)
    isEmailSent: mutation.isSuccess && mutation.data?.success === true,
    // Helper para verificar se foi "falso positivo" (email não cadastrado)
    isEmailNotRegistered: mutation.isSuccess && mutation.data?.success === false,
  };
};