
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePasswordRecovery } from '@/hooks/auth/password-recovery/usePasswordRecovery';
import { COLORS } from '@/constants/colors';
import { Logo } from '@/components/Logo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { 
    mutate: requestRecovery, 
    isPending, 
    isSuccess, 
    error,
    lastAttemptEmail,
    isEmailSent,
    isEmailNotRegistered
  } = usePasswordRecovery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestRecovery(email);
  };

  const getErrorMessage = (error: Error) => {
    const message = error.message;
    
    console.log('🔍 Erro capturado:', message); // Para debug
    
    // 🔥 CORREÇÃO: Verificar a mensagem EXATA do backend
    if (message.includes('Muitas tentativas recentes') || 
        message.includes('Aguarde 15 minutos') ||
        message.includes('rate limiting') ||
        message.includes('bloqueada')) {
      return {
        type: 'warning',
        message: '⏰ Muitas tentativas recentes. Aguarde 15 minutos antes de tentar novamente.',
        icon: 'bi bi-clock-history'
      };
    }
    
    if (message.includes('Aguarde')) {
      return {
        type: 'warning', 
        message: `⏰ ${message}`,
        icon: 'bi bi-clock'
      };
    }
    
    // 🔥 CORREÇÃO: Mensagem mais específica para outros erros
    return {
      type: 'error',
      message: `❌ ${message}`,
      icon: 'bi bi-exclamation-triangle'
    };
  };

  const isFormValid = email.length > 0 && /\S+@\S+\.\S+/.test(email);

  // ✅ CASO 1: Email foi realmente enviado (usuário cadastrado)
  if (isEmailSent) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
        <div className="card shadow-lg border-0 p-5" style={{ 
          maxWidth: '450px', 
          width: '100%',
          background: COLORS.backgroundLight,
          border: `1px solid ${COLORS.borderLight}`,
          animation: 'slideUp 0.6s ease-out'
        }}>
          <div className="text-center">
            <Logo size={60} scale={5} className="mb-3" />
            
           
            <h3 className="mb-3" style={{ color: COLORS.textPrimaryLight }}>
              Verifique seu Email
            </h3>
            
            <p className="text-muted mb-4">
              Enviamos um link de recuperação para <strong>{lastAttemptEmail}</strong>. 
              Verifique sua caixa de entrada e siga as instruções.
            </p>

            <div className="alert alert-info border-0" style={{ 
              backgroundColor: COLORS.info + '15',
              color: COLORS.info,
              fontSize: '0.9rem'
            }}>
              <i className="bi bi-info-circle me-2"></i>
              <strong>Não recebeu o email?</strong> Verifique sua pasta de spam ou 
              solicite um novo link após alguns minutos.
            </div>

            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                onClick={() => {
                  requestRecovery(lastAttemptEmail);
                }}
                disabled={isPending}
                style={{ 
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: isPending ? COLORS.borderLight : COLORS.primary,
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  opacity: isPending ? 0.6 : 1
                }}
              >
                {isPending ? 'Enviando...' : 'Reenviar Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ CASO 2: Email não cadastrado (feedback genérico de segurança)
  if (isEmailNotRegistered) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
        <div className="card shadow-lg border-0 p-5" style={{ 
          maxWidth: '450px', 
          width: '100%',
          background: COLORS.backgroundLight,
          border: `1px solid ${COLORS.borderLight}`,
          animation: 'slideUp 0.6s ease-out'
        }}>
          <div className="text-center">
            <Logo size={60} scale={5} className="mb-3" />
            
            
            <h3 className="mb-3" style={{ color: COLORS.textPrimaryLight }}>
              Solicitação Recebida
            </h3>
            
            <p className="text-muted mb-4">
              <strong>Se o email estiver cadastrado</strong>, você receberá instruções para redefinir sua senha em breve.
            </p>

            <div className="alert alert-info border-0" style={{ 
              backgroundColor: COLORS.info + '15',
              color: COLORS.info,
              fontSize: '0.9rem'
            }}>
              <i className="bi bi-shield-check me-2"></i>
              <strong>Dica de segurança:</strong> Verifique se digitou o email corretamente.
            </div>

            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                onClick={() => {
                  setEmail('');
                  window.location.reload(); // 🔥 Recarrega para resetar o estado
                }}
                style={{ 
                  padding: '10px 20px',
                  border: `2px solid ${COLORS.primary}`,
                  backgroundColor: 'transparent',
                  color: COLORS.primary,
                  borderRadius: '6px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Tentar Outro Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ CASO 3: Formulário normal (antes do envio)
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
      <div className="card shadow-lg border-0 p-5" style={{ 
        maxWidth: '450px', 
        width: '100%',
        background: COLORS.backgroundLight,
        border: `1px solid ${COLORS.borderLight}`,
        animation: 'slideUp 0.6s ease-out'
      }}>
        <div className="text-center mb-4">
          <Logo size={60} scale={5} className="mb-3" />
          
          <h2 style={{ color: COLORS.textPrimaryLight }}>Recuperar Senha</h2>
          <p className="text-muted">Digite seu email para solicitar recuperação</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label" style={{ color: COLORS.textPrimaryLight, fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="seuemail@exemplo.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              style={{
                border: `1px solid ${COLORS.borderLight}`,
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
              }}
            />
          </div>

          {error && (
            <div 
              className="alert d-flex align-items-center mb-4"
              style={{
                animation: 'shake 0.5s ease-in-out',
                border: 'none',
                backgroundColor: getErrorMessage(error).type === 'warning' 
                  ? COLORS.warning + '15' 
                  : COLORS.error + '15',
                color: getErrorMessage(error).type === 'warning' 
                  ? COLORS.warning 
                  : COLORS.error,
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.9rem',
              }}
            >
              <i className={`${getErrorMessage(error).icon} me-2`}></i>
              <span>{getErrorMessage(error).message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isPending}
            style={{ 
              width: '100%',
              padding: '12px',
              border: 'none',
              backgroundColor: isFormValid ? COLORS.primary : COLORS.borderLight,
              color: 'white',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              cursor: isFormValid && !isPending ? 'pointer' : 'not-allowed',
              opacity: isFormValid ? 1 : 0.6
            }}
          >
            {isPending ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border spinner-border-sm me-2"></div>
                Solicitando...
              </div>
            ) : (
              'Solicitar Recuperação'
            )}
          </button>
        </form>

       
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>  
  );
}