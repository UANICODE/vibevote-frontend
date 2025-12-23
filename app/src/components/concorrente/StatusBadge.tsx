// components/concorrente/StatusBadge.tsx
'use client';

import { COLORS } from '@/constants/colors';

interface StatusBadgeProps {
  estado: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ estado, size = 'md' }: StatusBadgeProps) {
  const getEstadoConfig = () => {
    switch (estado) {
      case 'APROVADO':
        return {
          color: COLORS.success,
          icon: 'bi-check-circle-fill',
          text: 'Aprovado',
          bgColor: `${COLORS.success}15`
        };
      case 'REJEITADO':
        return {
          color: COLORS.error,
          icon: 'bi-x-circle-fill',
          text: 'Rejeitado',
          bgColor: `${COLORS.error}15`
        };
      case 'PENDENTE':
      default:
        return {
          color: COLORS.warning,
          icon: 'bi-clock-fill',
          text: 'Pendente',
          bgColor: `${COLORS.warning}15`
        };
    }
  };

  const config = getEstadoConfig();
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3 text-lg'
  };

  return (
    <div 
      className={`badge rounded-pill d-inline-flex align-items-center ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: config.bgColor,
        color: config.color,
        fontWeight: '600',
        border: `1px solid ${config.color}30`
      }}
    >
      <i className={`bi ${config.icon} me-2`}></i>
      {config.text}
    </div>
  );
}