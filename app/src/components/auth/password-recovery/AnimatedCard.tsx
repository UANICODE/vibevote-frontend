// components/ui/AnimatedCard.tsx
import { ReactNode } from 'react';
import { COLORS } from '@/constants/colors';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style, className = '' }) => {
  return (
    <div
      className={`card shadow-lg border-0 ${className}`}
      style={{
        background: COLORS.backgroundLight,
        border: `1px solid ${COLORS.borderLight}`,
        animation: 'slideUp 0.6s ease-out',
      }}
    >
      <style jsx>{`
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
      `}</style>
      {children}
    </div>
  );
};