// components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { useFormValidation } from '@/hooks/auth/useFormValidation';
import { AuthErrorAlert } from './AuthErrorAlert';
import { AuthSuccessAlert } from './AuthSuccessAlert';
import { ValidatedInput } from '@/components/common/ValidatedInput';
import { COLORS } from '@/constants/colors';
import { LoginFormFields, LoginFormData, FormTouched } from '@/types/auth/form';
import { useRedirectAfterLogin } from '@/hooks/auth/useRedirectAfterLogin';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState<FormTouched>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login, isLoading, loginError } = useAuth();
  const { errors, validateField, validateForm, clearFieldError, clearErrors } = useFormValidation();
  const router = useRouter();

  const handleInputChange = (field: LoginFormFields, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpa mensagens ao usuário começar a digitar
    setSuccessMessage('');
    
    // Só valida se o campo já foi tocado
    if (touched[field]) {
      validateField(field, value);
    }
    
    // Limpa erro se existir
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  const handleInputBlur = (field: LoginFormFields): void => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Limpa mensagens anteriores
    setSuccessMessage('');
    clearErrors();
    
    // Marca todos os campos como tocados
    setTouched({ email: true, password: true });
    
    const validation = validateForm(formData);
    
    if (validation.isValid) {
      await performLogin();
    }
  };

  useRedirectAfterLogin();
  

  const performLogin = async (): Promise<void> => {
    try {
      await login(formData.email, formData.password);
      // O hook useRedirectAfterLogin cuidará do redirecionamento
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const isFormValid = (): boolean => {
    return formData.email.length > 0 && 
           formData.password.length > 0 && 
           Object.keys(errors).length === 0;
  };

  const handleDismissError = (): void => {
    // Limpa o erro do contexto
    // Você precisaria adicionar essa função no seu AuthContext
  };

  const handleDismissSuccess = (): void => {
    setSuccessMessage('');
  };

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-body p-4 p-md-5">
        <form onSubmit={handleSubmit} noValidate>
          <AuthSuccessAlert message={successMessage} onDismiss={handleDismissSuccess} />
          <AuthErrorAlert message={loginError} onDismiss={handleDismissError} />

          <ValidatedInput
            type="email"
            label="E-mail"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleInputBlur('email')}
            error={errors.email}
            placeholder="seu@email.com"
            disabled={isLoading}
          />

          <ValidatedInput
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            onBlur={() => handleInputBlur('password')}
            error={errors.password}
            placeholder="Seu password"
            disabled={isLoading}
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="mb-4">
            <div className="form-check">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-check-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                style={{ 
                  borderColor: COLORS.borderLight,
                  backgroundColor: rememberMe ? COLORS.primary : 'white'
                }}
              />
              <label htmlFor="remember-me" className="form-check-label text-muted">
                Lembrar-me
              </label>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-lg fw-semibold text-white border-0"
              disabled={isLoading || !isFormValid()}
              style={{ 
                backgroundColor: isFormValid() ? COLORS.primary : `${COLORS.primary}80`,
                cursor: isFormValid() && !isLoading ? 'pointer' : 'not-allowed'
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Entrando...
                </>
              ) : (
                'Entrar no Painel'
              )}
            </button>
          </div>

          <div className="text-center mt-3">
            <a 
              href="#" 
              className="text-decoration-none"
              style={{ color: COLORS.primary }}
            >
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};