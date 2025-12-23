// components/public/PublicFooter.tsx
'use client';

import { COLORS } from '@/constants/colors';
import Link from 'next/link';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-auto"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.backgroundLight} 0%, ${COLORS.surfaceLight} 100%)`,
        borderTop: `1px solid ${COLORS.borderLight}`
      }}
    >
      {/* Call to Action */}
      <div 
        className="py-5 text-center"
        style={{ 
          background: COLORS.gradientPrimary,
          color: 'white'
        }}
      >
        <div className="container">
          <h3 className="h2 fw-bold mb-3">
            Participe e Mostre Seu Talento!
          </h3>
          <p className="mb-4 opacity-90">
            Inscreva-se agora e tenha a chance de ser o próximo grande vencedor. 
            A plataforma que conecta talentos a oportunidades únicas.
          </p>
          <Link 
            href="/concursos-publicos"
            className="btn btn-light btn-lg px-5"
            style={{ 
              fontWeight: '600',
              color: COLORS.primary
            }}
          >
            <i className="bi bi-trophy me-2"></i>
            Ver Todos os Concursos
          </Link>
        </div>
      </div>

      {/* Informações */}
      <div className="py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: COLORS.gradientPrimary,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  VV
                </div>
                <div>
                  <h4 className="h5 fw-bold mb-0" style={{ color: COLORS.primary }}>
                    VibeVote
                  </h4>
                  <p className="text-muted small mb-0">Plataforma de Competições Online</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-3">
                <div className="text-center text-md-start">
                  <p className="text-muted small mb-1">
                    © {currentYear} VibeVote. Todos os direitos reservados.
                  </p>
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <span className="text-muted small me-2">Desenvolvido por</span>
                    <span 
                      className="badge rounded-pill px-3 py-2"
                      style={{ 
                        background: COLORS.gradientPrimary,
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.85rem'
                      }}
                    >
                      <i className="bi bi-code-slash me-1"></i>
                      UANICODE
                    </span>
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                  <a 
                    href="#"
                    className="text-decoration-none"
                    style={{ color: COLORS.textMutedLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                  >
                    <i className="bi bi-shield-check fs-5"></i>
                  </a>
                  <a 
                    href="#"
                    className="text-decoration-none"
                    style={{ color: COLORS.textMutedLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                  >
                    <i className="bi bi-file-text fs-5"></i>
                  </a>
                  <a 
                    href="#"
                    className="text-decoration-none"
                    style={{ color: COLORS.textMutedLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                  >
                    <i className="bi bi-envelope fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}