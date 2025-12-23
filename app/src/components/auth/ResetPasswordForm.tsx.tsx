// app/reset-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePasswordReset } from '@/hooks/auth/password-recovery/usePasswordReset';
import { useTokenValidation } from '@/hooks/auth/password-recovery/useTokenValidation';
import { usePasswordStrength } from '@/hooks/auth/password-recovery/usePasswordStrength';
import { AnimatedCard } from '@/components/auth/password-recovery/AnimatedCard';
import { AnimatedButton } from '@/components/auth/password-recovery/ AnimatedButton';
import { PasswordStrengthMeter } from '@/components/auth/password-recovery/PasswordStrengthMeter';
import { COLORS } from '@/constants/colors';
import { Logo } from '@/components/Logo';

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [validationError, setValidationError] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { mutate: resetPassword, isPending: isResetting, isSuccess, error } = usePasswordReset();
  const { 
    mutate: validateToken, 
    isPending: isValidating, 
    data: validationData,
    error: validationErrorData 
  } = useTokenValidation();
  
  const { passwordStrength, validatePassword } = usePasswordStrength();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      validateToken(urlToken, {
        onError: (error) => {
          setValidationError((error as Error).message);
        }
      });
    }
  }, [searchParams, validateToken]);

  const handlePasswordChange = (password: string) => {
    setNewPassword(password);
    validatePassword(password);
  };

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canSubmit = passwordStrength.isValid && passwordsMatch && token && !isValidating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      resetPassword({ token, newPassword, confirmPassword });
    }
  };

  if (isValidating) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
        <AnimatedCard className="p-5 text-center" style={{ maxWidth: '400px', width: '100%' }}>
                   <Logo size={60} scale={5} className="mb-3" />
          <div className="spinner-border text-primary mb-3" role="status" style={{ color: COLORS.primary }}>
            <span className="visually-hidden">Validando token...</span>
          </div>
          <p style={{ color: COLORS.textSecondaryLight }}>Validando token de segurança...</p>
        </AnimatedCard>
      </div>
    );
  }

  if (validationError || (validationErrorData && !(validationData as any)?.success
)) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
        <AnimatedCard className="p-5 text-center" style={{ maxWidth: '400px', width: '100%' }}>
          
          <Logo size={60} scale={5} className="mb-3" />
         
          <h3 className="mb-3" style={{ color: COLORS.textPrimaryLight }}>Token Inválido</h3>
          <p className="text-muted mb-4">
            {validationError || 'O link de recuperação é inválido ou expirou.'}
          </p>
          <AnimatedButton 
            variant="primary" 
            onClick={() => router.push('/forgot-password')}
            style={{ width: '100%' }}
          >
            Solicitar Novo Link
          </AnimatedButton>
        </AnimatedCard>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
        <AnimatedCard className="p-5 text-center" style={{ maxWidth: '400px', width: '100%' }}>
         <Logo size={60} scale={5} className="mb-3" />
         
          <h3 className="mb-3" style={{ color: COLORS.textPrimaryLight }}>Senha Redefinida!</h3>
          <p className="text-muted mb-4">
            Sua senha foi redefinida com sucesso. 
            Agora você pode ir na app fazer login com sua nova senha.
          </p>
        </AnimatedCard>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
      <AnimatedCard className="p-5" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <Logo size={60} scale={5} className="mb-3" />
      
          <h2 style={{ color: COLORS.textPrimaryLight }}>Nova Senha</h2>
          <p className="text-muted">Crie uma nova senha segura para sua conta</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label" style={{ color: COLORS.textPrimaryLight, fontWeight: '500' }}>
              Nova Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              disabled={isResetting}
              style={{
                border: `1px solid ${COLORS.borderLight}`,
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.primary;
                e.target.style.boxShadow = `0 0 0 2px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.borderLight;
                e.target.style.boxShadow = 'none';
              }}
            />
            <PasswordStrengthMeter strength={passwordStrength} />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label" style={{ color: COLORS.textPrimaryLight, fontWeight: '500' }}>
              Confirmar Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isResetting}
              style={{
                border: `1px solid ${passwordsMatch && confirmPassword.length > 0 ? COLORS.success : COLORS.borderLight}`,
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.primary;
                e.target.style.boxShadow = `0 0 0 2px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = passwordsMatch && confirmPassword.length > 0 ? COLORS.success : COLORS.borderLight;
                e.target.style.boxShadow = 'none';
              }}
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                <i className="bi bi-exclamation-circle me-1"></i>
                As senhas não coincidem
              </div>
            )}
            {passwordsMatch && (
              <div className="text-success mt-1" style={{ fontSize: '0.875rem' }}>
                <i className="bi bi-check-circle me-1"></i>
                Senhas coincidem
              </div>
            )}
          </div>

          {error && (
            <div 
              className="alert alert-danger d-flex align-items-center"
              style={{
                animation: 'shake 0.5s ease-in-out',
                border: 'none',
                backgroundColor: COLORS.error + '15',
                color: COLORS.error,
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.9rem',
              }}
            >
              <i className="bi bi-exclamation-triangle me-2"></i>
              <span>{(error as Error).message}</span>
            </div>
          )}

          <AnimatedButton 
            type="submit" 
            variant="primary" 
            loading={isResetting}
            disabled={!canSubmit}
            style={{ 
              width: '100%', 
              padding: '12px',
              backgroundColor: canSubmit ? COLORS.primary : COLORS.borderLight,
            }}
          >
            Redefinir Senha
          </AnimatedButton>
        </form>
      </AnimatedCard>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}