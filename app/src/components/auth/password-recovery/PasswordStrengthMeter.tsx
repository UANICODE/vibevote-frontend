// components/auth/PasswordStrengthMeter.tsx
import { PasswordStrength } from '@/types/auth/password-recovery';
import { COLORS } from '@/constants/colors';

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  const getStrengthColor = (score: number) => {
    const colors = [COLORS.error, COLORS.warning, COLORS.warning, COLORS.info, COLORS.success];
    return colors[Math.min(score, colors.length - 1)];
  };

  const getStrengthLabel = (score: number) => {
    const labels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
    return labels[Math.min(score, labels.length - 1)];
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">Força da senha:</small>
        <small 
          style={{ 
            color: getStrengthColor(strength.score),
            fontWeight: 'bold'
          }}
        >
          {getStrengthLabel(strength.score)}
        </small>
      </div>
      
      <div className="progress" style={{ height: '6px', backgroundColor: COLORS.borderLight }}>
        <div
          className="progress-bar"
          style={{
            width: `${(strength.score / 5) * 100}%`,
            backgroundColor: getStrengthColor(strength.score),
            transition: 'all 0.3s ease-in-out',
          }}
        />
      </div>

      {strength.feedback.length > 0 && (
        <div className="mt-2">
          {strength.feedback.map((message, index) => (
            <div
              key={index}
              className={`d-flex align-items-center ${index > 0 ? 'mt-1' : ''}`}
              style={{
                fontSize: '0.75rem',
                color: message.includes('Senha forte') ? COLORS.success : COLORS.textSecondaryLight,
              }}
            >
              <span
                className={`me-2 ${message.includes('Senha forte') ? 'text-success' : ''}`}
                style={{
                  fontSize: '0.5rem',
                }}
              >
                ●
              </span>
              {message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};