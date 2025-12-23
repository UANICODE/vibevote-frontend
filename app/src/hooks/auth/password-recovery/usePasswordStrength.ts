// hooks/auth/use-password-strength.ts
import { useState, useCallback } from 'react';
import { PasswordStrength } from '@/types/auth/password-recovery';
import { PasswordValidator } from '@/utils/validation/PasswordValidator';

export const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  });

  const validatePassword = useCallback((password: string) => {
    const strength = PasswordValidator.validatePassword(password);
    setPasswordStrength(strength);
    return strength;
  }, []);

  return {
    passwordStrength,
    validatePassword,
  };
};