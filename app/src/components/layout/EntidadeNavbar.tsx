// components/layout/EntidadeNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { COLORS } from '@/constants/colors';

interface EntidadeNavbarProps {
  userName?: string;
  userEmail?: string;
}

export function EntidadeNavbar({ userName, userEmail }: EntidadeNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  // Determinar página ativa baseada no pathname
  const getActivePage = () => {
    if (pathname.startsWith('/entidade') || pathname.startsWith('/entidade/concursos/')) {
      return 'dashboard';
    }
    if (pathname.startsWith('/entidade/ranking')) {
      return 'ranking';
    }
    if (pathname.startsWith('/entidade/vencedores')) {
      return 'vencedores';
    }
    return 'dashboard';
  };

  const activePage = getActivePage();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  const getNavLinkStyle = (page: string) => {
    const isActive = activePage === page;
    return {
      color: isActive ? COLORS.primary : COLORS.textPrimaryLight,
      borderBottom: isActive ? `3px solid ${COLORS.primary}` : 'none',
      fontWeight: isActive ? '600' : '500',
      paddingBottom: '8px',
      transition: 'all 0.2s ease'
    };
  };

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown') && !target.closest('.navbar-toggler')) {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Prevenir scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{ 
          backgroundColor: COLORS.surfaceLight,
          borderBottom: `1px solid ${COLORS.borderLight}`,
          zIndex: 1030
        }}
      >
        <div className="container-fluid px-3 px-md-4">
          {/* Logo e Nome do Sistema */}
          <Link href="/entidade" className="navbar-brand d-flex align-items-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3"
              style={{ 
                width: '40px', 
                height: '40px', 
                background: COLORS.gradientPrimary,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: `0 2px 8px ${COLORS.shadowLight}`
              }}
            >
              VV
            </div>
            <span 
              className="fw-bold d-none d-md-block"
              style={{ 
                color: COLORS.primary,
                fontSize: '1.3rem',
                letterSpacing: '-0.5px'
              }}
            >
              VibeVote
            </span>
            <span 
              className="fw-bold d-block d-md-none"
              style={{ 
                color: COLORS.primary,
                fontSize: '1.1rem'
              }}
            >
         
            </span>
          </Link>

          {/* Botão para menu mobile e Perfil no mobile */}
          <div className="d-flex align-items-center">
            {/* Ícone de perfil visível apenas em mobile */}
            <button
              className="btn btn-link d-lg-none me-2 p-0"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{ color: COLORS.textPrimaryLight }}
            >
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: COLORS.gradientSecondary,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {userName?.charAt(0).toUpperCase() || 'E'}
              </div>
            </button>

            {/* Botão hamburguer */}
        
<div className="d-lg-none">
  <div className="dropdown">
    <button
      className="btn btn-outline-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      style={{ 
        borderColor: COLORS.primary,
        color: COLORS.primary,
        padding: '8px 16px'
      }}
    >
      <i className="bi bi-list me-2"></i>
      Menu
    </button>
    <div 
      className="dropdown-menu dropdown-menu-end"
      style={{ 
        minWidth: '250px',
        border: `1px solid ${COLORS.borderLight}`,
        boxShadow: `0 8px 24px ${COLORS.shadowLight}`,
      }}
    >
      <Link href="/entidade" className="dropdown-item d-flex align-items-center py-3">
        <i className="bi bi-trophy me-3"></i>
        <span>Meus Concursos</span>
      </Link>
      {/* Divider 
      <div className="dropdown-divider"></div>
      <Link href="/entidade/ranking" className="dropdown-item d-flex align-items-center py-3">
        <i className="bi bi-bar-chart me-3"></i>
        <span>Ranking em Tempo Real</span>
      </Link>
      <Link href="/entidade/vencedores" className="dropdown-item d-flex align-items-center py-3">
        <i className="bi bi-award me-3"></i>
        <span>Vencedores</span>
      </Link>
   */}
    </div>
  </div>
</div>
          </div>

          {/* Menu Principal para Desktop */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav mx-auto">
              {/* Meus Concursos */}
              <li className="nav-item mx-3">
                <Link 
                  href="/entidade" 
                  className="nav-link d-flex align-items-center"
                  style={getNavLinkStyle('dashboard')}
                >
                  <i className="bi bi-trophy me-2"></i>
                  <span>Meus Concursos</span>
                </Link>
              </li>
              
              {/* Ranking em Tempo Real */}
              <li className="nav-item mx-3">
                <Link 
                  href="/entidade/ranking" 
                  className="nav-link d-flex align-items-center"
                  style={getNavLinkStyle('ranking')}
                >
                  <i className="bi bi-bar-chart me-2"></i>
                  <span>Ranking em Tempo Real</span>
                </Link>
              </li>
              
              {/* Vencedores */}
              <li className="nav-item mx-3">
                <Link 
                  href="/entidade/vencedores" 
                  className="nav-link d-flex align-items-center"
                  style={getNavLinkStyle('vencedores')}
                >
                  <i className="bi bi-award me-2"></i>
                  <span>Vencedores</span>
                </Link>
              </li>
            </ul>

            {/* Perfil no Desktop - NO CANTO DIREITO */}
            <div className="dropdown ms-auto">
              <button
                className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none p-0 border-0 bg-transparent"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                style={{ 
                  color: COLORS.textPrimaryLight,
                  outline: 'none'
                }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-2 position-relative"
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: COLORS.gradientSecondary,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: `0 2px 6px ${COLORS.shadowLight}`
                  }}
                >
                  {userName?.charAt(0).toUpperCase() || 'E'}
                </div>
                
                <div className="text-start d-none d-xl-block">
                  <div 
                    className="small fw-semibold"
                    style={{ color: COLORS.textPrimaryLight }}
                  >
                    {userName || 'Entidade'}
                  </div>
                  <div 
                    className="x-small"
                    style={{ 
                      color: COLORS.textMutedLight,
                      maxWidth: '180px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {userEmail || 'entidade@email.com'}
                  </div>
                </div>
                
                <i 
                  className={`bi bi-chevron-down ms-2 ${isProfileOpen ? 'rotate-180' : ''}`}
                  style={{ 
                    color: COLORS.textMutedLight,
                    transition: 'transform 0.3s ease'
                  }}
                ></i>
              </button>
              
              {isProfileOpen && (
                <div 
                  className="dropdown-menu show position-absolute end-0 mt-2"
                  style={{ 
                    minWidth: '220px',
                    border: `1px solid ${COLORS.borderLight}`,
                    boxShadow: `0 8px 24px ${COLORS.shadowLight}`,
                    borderRadius: '12px',
                    backgroundColor: COLORS.surfaceLight,
                    zIndex: 1050
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className="dropdown-header"
                    style={{ 
                      color: COLORS.textMutedLight,
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Minha Conta
                  </div>
                  
                  <Link 
                    href="/entidade/perfil" 
                    className="dropdown-item d-flex align-items-center py-3"
                    onClick={() => setIsProfileOpen(false)}
                    style={{ 
                      color: COLORS.textPrimaryLight,
                      borderBottom: `1px solid ${COLORS.dividerLight}`
                    }}
                  >
                    <i className="bi bi-person me-3"></i>
                    <div>
                      <div className="fw-medium">Meu Perfil</div>
                      <div className="x-small text-muted">Gerencie suas informações</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/entidade/configuracoes" 
                    className="dropdown-item d-flex align-items-center py-3"
                    onClick={() => setIsProfileOpen(false)}
                    style={{ 
                      color: COLORS.textPrimaryLight,
                      borderBottom: `1px solid ${COLORS.dividerLight}`
                    }}
                  >
                    <i className="bi bi-gear me-3"></i>
                    <div>
                      <div className="fw-medium">Configurações</div>
                      <div className="x-small text-muted">Preferências do sistema</div>
                    </div>
                  </Link>
                  
                  <div className="dropdown-divider my-1"></div>
                  
                  <button 
                    className="dropdown-item d-flex align-items-center py-3 w-100 border-0 bg-transparent"
                    onClick={handleLogout}
                    style={{ color: COLORS.error }}
                  >
                    <i className="bi bi-box-arrow-right me-3"></i>
                    <div>
                      <div className="fw-medium">Sair</div>
                      <div className="x-small text-muted">Encerrar sessão</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1040
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="position-absolute top-0 end-0 h-100 bg-white"
              style={{ 
                width: '85%',
                maxWidth: '320px',
                boxShadow: `-4px 0 20px ${COLORS.shadowDark}`,
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabeçalho Mobile */}
              <div className="p-4 border-bottom" style={{ backgroundColor: COLORS.backgroundLight }}>
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: COLORS.gradientSecondary,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}
                  >
                    {userName?.charAt(0).toUpperCase() || 'E'}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                      {userName || 'Entidade'}
                    </h6>
                    <p className="text-muted small mb-0">{userEmail || 'entidade@email.com'}</p>
                  </div>
                </div>
                <button 
                  className="btn btn-sm w-100"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/entidade/perfil');
                  }}
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    border: 'none',
                    fontWeight: '600'
                  }}
                >
                  <i className="bi bi-person me-2"></i>
                  Ver Perfil
                </button>
              </div>

              {/* Menu Mobile */}
              <div className="p-3">
                <div className="nav flex-column">
                  <Link 
                    href="/entidade" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      color: activePage === 'dashboard' ? COLORS.primary : COLORS.textPrimaryLight,
                      backgroundColor: activePage === 'dashboard' ? `${COLORS.primary}10` : 'transparent',
                      marginBottom: '4px'
                    }}
                  >
                    <i className="bi bi-trophy me-3" style={{ fontSize: '1.2rem', width: '24px' }}></i>
                    <span className="fw-medium">Meus Concursos</span>
                    {activePage === 'dashboard' && (
                      <i className="bi bi-chevron-right ms-auto" style={{ color: COLORS.primary }}></i>
                    )}
                  </Link>
                  
                  <Link 
                    href="/entidade/ranking" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      color: activePage === 'ranking' ? COLORS.primary : COLORS.textPrimaryLight,
                      backgroundColor: activePage === 'ranking' ? `${COLORS.primary}10` : 'transparent',
                      marginBottom: '4px'
                    }}
                  >
                    <i className="bi bi-bar-chart me-3" style={{ fontSize: '1.2rem', width: '24px' }}></i>
                    <span className="fw-medium">Ranking em Tempo Real</span>
                    {activePage === 'ranking' && (
                      <i className="bi bi-chevron-right ms-auto" style={{ color: COLORS.primary }}></i>
                    )}
                  </Link>
                  
                  <Link 
                    href="/entidade/vencedores" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      color: activePage === 'vencedores' ? COLORS.primary : COLORS.textPrimaryLight,
                      backgroundColor: activePage === 'vencedores' ? `${COLORS.primary}10` : 'transparent',
                      marginBottom: '4px'
                    }}
                  >
                    <i className="bi bi-award me-3" style={{ fontSize: '1.2rem', width: '24px' }}></i>
                    <span className="fw-medium">Vencedores</span>
                    {activePage === 'vencedores' && (
                      <i className="bi bi-chevron-right ms-auto" style={{ color: COLORS.primary }}></i>
                    )}
                  </Link>
                </div>

                {/* Opções de conta no mobile */}
                <div className="mt-4 pt-3 border-top">
                  <Link 
                    href="/entidade/configuracoes" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ color: COLORS.textPrimaryLight, marginBottom: '4px' }}
                  >
                    <i className="bi bi-gear me-3" style={{ fontSize: '1.2rem', width: '24px' }}></i>
                    <span className="fw-medium">Configurações</span>
                  </Link>
                  
                  <button 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded w-100 border-0 bg-transparent text-start"
                    onClick={handleLogout}
                    style={{ color: COLORS.error }}
                  >
                    <i className="bi bi-box-arrow-right me-3" style={{ fontSize: '1.2rem', width: '24px' }}></i>
                    <span className="fw-medium">Sair</span>
                  </button>
                </div>

                {/* Footer Mobile */}
                <div className="mt-5 pt-4 text-center">
                  <p className="text-muted small mb-2">VibeVote © 2024</p>
                  <p className="text-muted x-small">Sistema de Votação e Inscrição</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Estilos globais */}
      <style jsx global>{`
        .rotate-180 {
          transform: rotate(180deg);
        }
        .dropdown-item:hover {
          background-color: ${COLORS.backgroundLight} !important;
          color: ${COLORS.primary} !important;
        }
        .navbar-toggler:focus {
          box-shadow: 0 0 0 2px ${COLORS.primary}40 !important;
        }
        .nav-link:hover {
          color: ${COLORS.primary} !important;
        }
      `}</style>
    </>
  );
}