// components/public/PublicHeader.tsx
'use client';

import { COLORS } from '@/constants/colors';
import Link from 'next/link';

interface PublicHeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export function PublicHeader({ showBackButton = false, title }: PublicHeaderProps) {
  return (
    <header 
      className="sticky-top shadow-sm"
      style={{ 
        backgroundColor: COLORS.surfaceLight,
        borderBottom: `1px solid ${COLORS.borderLight}`,
        zIndex: 1000
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Logo */}
          <Link href="/concursos-publicos" className="text-decoration-none">
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: COLORS.gradientPrimary,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  boxShadow: `0 4px 12px ${COLORS.shadowLight}`
                }}
              >
                VV
              </div>
              <div>
                <h1 className="h4 fw-bold mb-0" style={{ color: COLORS.primary }}>
                  VibeVote
                </h1>
                <p className="text-muted x-small mb-0">Competições Online</p>
              </div>
            </div>
          </Link>

          {/* Botão de login */}
          <div className="d-flex align-items-center gap-3">
            {showBackButton && (
              <Link 
                href="/concursos-publicos"
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                style={{ 
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                  fontWeight: '600'
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Voltar
              </Link>
            )}
            
            <Link 
              href="/auth"
              className="btn btn-sm d-flex align-items-center"
              style={{ 
                background: COLORS.gradientPrimary,
                color: 'white',
                border: 'none',
                fontWeight: '600',
                padding: '0.5rem 1rem'
              }}
            >
              <i className="bi bi-person me-2"></i>
              Login
            </Link>
          </div>
        </div>
      </div>

      {title && (
        <div className="py-4" style={{ backgroundColor: `${COLORS.primary}05` }}>
          <div className="container">
            <h2 className="h3 fw-bold text-center mb-0" style={{ color: COLORS.textPrimaryLight }}>
              {title}
            </h2>
          </div>
        </div>
      )}
    </header>
  );
}