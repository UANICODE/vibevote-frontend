// components/ui/AnimatedButton.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { COLORS } from '@/constants/colors';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      transition: 'all 0.3s ease-in-out',
      transform: 'translateY(0)',
      position: 'relative' as const,
      overflow: 'hidden',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600' as const,
      fontSize: '1rem',
    };

    const variants = {
      primary: {
        backgroundColor: props.disabled ? COLORS.borderLight : COLORS.primary,
        color: 'white',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
      },
      secondary: {
        backgroundColor: COLORS.secondary,
        color: 'white',
      },
      outline: {
        backgroundColor: 'transparent',
        border: `2px solid ${COLORS.primary}`,
        color: COLORS.primary,
      },
    };

    return { ...baseStyles, ...variants[variant] };
  };

  return (
    <button
      className={`btn ${className}`}
      style={getVariantStyles()}
      onMouseEnter={(e) => {
        if (!props.disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <div 
            className="spinner-border spinner-border-sm me-2" 
            style={{ 
              width: '1rem', 
              height: '1rem',
              borderWidth: '2px',
              borderColor: 'rgba(255,255,255,0.3)',
              borderTopColor: 'white'
            }} 
          />
          Processando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};