// components/auth/AuthSuccessAlert.tsx
import { COLORS } from '@/constants/colors';

interface AuthSuccessAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const AuthSuccessAlert: React.FC<AuthSuccessAlertProps> = ({ message, onDismiss }) => (
  message ? (
    <div 
      className="alert alert-dismissible fade show d-flex align-items-center"
      style={{ 
        backgroundColor: `${COLORS.success}15`, 
        borderColor: COLORS.success,
        color: COLORS.textPrimaryLight
      }}
      role="alert"
    >
      <i className="bi bi-check-circle-fill me-2" style={{ color: COLORS.success }}></i>
      <div className="flex-grow-1">
        <strong className="me-2" style={{ color: COLORS.success }}>Sucesso:</strong>
        {message}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          onClick={onDismiss}
          aria-label="Close"
        />
      )}
    </div>
  ) : null
);