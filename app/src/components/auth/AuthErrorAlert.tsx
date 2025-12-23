// components/auth/AuthErrorAlert.tsx
import { COLORS } from '@/constants/colors';

interface AuthErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ message, onDismiss }) => (
  message ? (
    <div 
      className="alert alert-dismissible fade show d-flex align-items-center"
      style={{ 
        backgroundColor: `${COLORS.error}15`, 
        borderColor: COLORS.error,
        color: COLORS.textPrimaryLight
      }}
      role="alert"
    >
      <i className="bi bi-exclamation-triangle-fill me-2" style={{ color: COLORS.error }}></i>
      <div className="flex-grow-1">
   
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