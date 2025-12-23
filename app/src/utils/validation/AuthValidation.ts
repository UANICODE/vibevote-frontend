// utils/validation/authValidation.ts
import { LoginFormFields, FormErrors } from '@/types/auth/form';

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export class AuthValidation {
  static validateEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) return 'E-mail é obrigatório';
    if (!emailRegex.test(email)) return 'E-mail inválido';
    
    return '';
  }

  static validatePassword(password: string): string {
    if (!password) return 'Senha é obrigatória';
    if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
    
    return '';
  }

  static validateLoginForm(email: string, password: string): ValidationResult {
    const errors: FormErrors = {};
    
    const emailError = this.validateEmail(email);
    const passwordError = this.validatePassword(password);
    
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static getFieldError(field: LoginFormFields, value: string): string {
    const validators: Record<LoginFormFields, (value: string) => string> = {
      email: this.validateEmail,
      password: this.validatePassword
    };
    
    return validators[field] ? validators[field](value) : '';
  }
}