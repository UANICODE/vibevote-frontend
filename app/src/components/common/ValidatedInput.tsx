// components/common/ValidatedInput.tsx
import { COLORS } from '@/constants/colors';

interface ValidatedInputProps {
  type: 'text' | 'email' | 'password';
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  type,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = true,
  disabled = false,
  showPasswordToggle = false,
  onTogglePassword
}) => {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <label htmlFor={label.toLowerCase()} className="form-label fw-medium">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      
      <div className="input-group">
        <input
          id={label.toLowerCase()}
          type={type}
          className={`form-control form-control-lg ${hasError ? 'is-invalid' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={{ 
            borderColor: hasError ? COLORS.error : COLORS.borderLight,
            backgroundColor: 'white'
          }}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onTogglePassword}
            disabled={disabled}
            style={{ 
              borderColor: hasError ? COLORS.error : COLORS.borderLight,
              borderLeft: 'none'
            }}
          >
            <i className={`bi bi-eye${type === 'password' ? '' : '-slash'}`}></i>
          </button>
        )}
      </div>
      
      {hasError && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
};