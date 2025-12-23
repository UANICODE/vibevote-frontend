// utils/validators/password-validator.ts
import { PasswordStrength, PasswordValidationRules } from '@/types/auth/password-recovery';

export class PasswordValidator {
  private static readonly MIN_LENGTH = 8;
  private static readonly PATTERNS = {
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[@#$%^&+=]/,
  };

  static validatePassword(password: string): PasswordStrength {
    const rules = this.checkRules(password);
    const score = this.calculateScore(rules);
    const feedback = this.generateFeedback(rules, score);

    return {
      score,
      feedback,
      isValid: score >= 4,
    };
  }

  private static checkRules(password: string): PasswordValidationRules {
    return {
      hasMinLength: password.length >= this.MIN_LENGTH,
      hasUpperCase: this.PATTERNS.upperCase.test(password),
      hasLowerCase: this.PATTERNS.lowerCase.test(password),
      hasNumber: this.PATTERNS.number.test(password),
      hasSpecialChar: this.PATTERNS.specialChar.test(password),
    };
  }

  private static calculateScore(rules: PasswordValidationRules): number {
    return Object.values(rules).filter(Boolean).length;
  }

  private static generateFeedback(rules: PasswordValidationRules, score: number): string[] {
    const feedback: string[] = [];

    !rules.hasMinLength && feedback.push(`Mínimo ${this.MIN_LENGTH} caracteres`);
    !rules.hasUpperCase && feedback.push('Pelo menos uma letra maiúscula');
    !rules.hasLowerCase && feedback.push('Pelo menos uma letra minúscula');
    !rules.hasNumber && feedback.push('Pelo menos um número');
    !rules.hasSpecialChar && feedback.push('Pelo menos um caractere especial (@#$%^&+=)');

    score >= 4 && feedback.push('Senha forte!');

    return feedback;
  }
}