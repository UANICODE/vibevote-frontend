// components/layout/EntidadeFooter.tsx - Versão com gradiente
'use client';

import { COLORS } from '@/constants/colors';
import Link from 'next/link';

interface EntidadeFooterProps {
  compact?: boolean;
  gradient?: boolean;
}

export function EntidadeFooter({ compact = false, gradient = false }: EntidadeFooterProps) {
  const currentYear = new Date().getFullYear();

  const footerStyle = gradient ? {
    background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
    borderTop: `1px solid ${COLORS.borderLight}`
  } : {
    backgroundColor: COLORS.backgroundLight,
    borderTop: `1px solid ${COLORS.borderLight}`
  };

  if (compact) {
    return (
      <footer className="mt-auto">
        <div 
          className="py-3"
          style={{ 
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            borderTop: `1px solid ${COLORS.borderLight}`
          }}
        >
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-2 mb-md-0">
                <p className="mb-0 text-muted small">
                  © {currentYear} VibeVote. Todos os direitos reservados.
                </p>
              </div>
              
              <div className="d-flex align-items-center">
                <span className="text-muted small me-2">Desenvolvido por</span>
                <div 
                  className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                  style={{ 
                    background: COLORS.gradientPrimary,
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  <i className="bi bi-code-slash me-2"></i>
                  UANICODE
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto">
      <div className="py-5" style={footerStyle}>
        <div className="container">
          <div className="row">
            {/* Logo e Slogan */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: '50px', 
                      height: '50px', 
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
                    <h3 className="fw-bold mb-0" style={{ color: COLORS.primary }}>
                      VibeVote
                    </h3>
                    <p className="text-muted small mb-0">Revolucionando competições online</p>
                  </div>
                </div>
                <p className="text-muted">
                  Plataforma completa para criação e gestão de concursos interativos. 
                  Conecte-se com seu público de forma inovadora.
                </p>
              </div>
              
              {/* Social Media */}
              <div className="d-flex gap-3">
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ color: COLORS.textMutedLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ color: COLORS.textMutedLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ color: COLORS.textMutedLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none"
                  style={{ color: COLORS.textMutedLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="fw-semibold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                Plataforma
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link 
                    href="/entidade" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="mb-3">
                  <Link 
                    href="/entidade/novo-concurso" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Criar Concurso
                  </Link>
                </li>
                <li className="mb-3">
                  <Link 
                    href="/entidade/ranking" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Ranking
                  </Link>
                </li>
                <li className="mb-3">
                  <Link 
                    href="/entidade/vencedores" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Vencedores
                  </Link>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="fw-semibold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                Suporte
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a 
                    href="#" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Central de Ajuda
                  </a>
                </li>
                <li className="mb-3">
                  <a 
                    href="#" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    FAQ
                  </a>
                </li>
                <li className="mb-3">
                  <a 
                    href="#" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Tutoriais
                  </a>
                </li>
                <li className="mb-3">
                  <a 
                    href="#" 
                    className="text-decoration-none d-flex align-items-center text-muted"
                    style={{ transition: 'all 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.primary;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.textMutedLight;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="bi bi-chevron-right me-2 small"></i>
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* UANICODE Card */}
            <div className="col-lg-4 col-md-4">
              <h5 className="fw-semibold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                Desenvolvimento
              </h5>
              
              <div 
                className="card border-0 shadow-lg hover-lift mb-4"
                style={{ 
                  background: COLORS.gradientPrimary,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="card-body p-4 text-white">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 bg-white"
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >
                      <i className="bi bi-code-slash"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0">UANICODE</h4>
                      <p className="mb-0 opacity-75">Soluções Digitais</p>
                    </div>
                  </div>
                  <p className="mb-4 opacity-90">
                    Desenvolvemos soluções digitais inovadoras que transformam 
                    ideias em realidade. Tecnologia com propósito.
                  </p>
                  
                  <div className="d-flex gap-3">
                    <a 
                      href="https://uanicode.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-light d-flex align-items-center"
                      style={{ fontWeight: '600' }}
                    >
                      <i className="bi bi-globe me-2"></i>
                      Website
                    </a>
                    <a 
                      href="mailto:contato@uanicode.com" 
                      className="btn btn-sm btn-outline-light d-flex align-items-center"
                      style={{ fontWeight: '600' }}
                    >
                      <i className="bi bi-envelope me-2"></i>
                      Contato
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divisor com gradiente */}
          <div 
            className="my-4"
            style={{ 
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${COLORS.primary}50, transparent)`
            }}
          ></div>

          {/* Copyright e links legais */}
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 text-muted">
                © {currentYear} VibeVote. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex flex-wrap justify-content-md-end gap-3">
                <a 
                  href="#" 
                  className="text-decoration-none text-muted"
                  style={{ transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  Termos de Serviço
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none text-muted"
                  style={{ transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  Privacidade
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none text-muted"
                  style={{ transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textMutedLight}
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}