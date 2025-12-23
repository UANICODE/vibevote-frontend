// components/concorrente/ConcorrenteNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { COLORS } from '@/constants/colors';

interface ConcorrenteNavbarProps {
  userName?: string;
  userEmail?: string;
}

export function ConcorrenteNavbar({ userName, userEmail }: ConcorrenteNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const getActivePage = () => {
    if (pathname.startsWith('/concorrente/acompanhamento')) {
      return 'acompanhamento';
    }
    if (pathname.startsWith('/concorrente/concursos')) {
      return 'concursos';
    }
    return 'acompanhamento';
  };

  const activePage = getActivePage();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown') && !target.closest('.navbar-toggler')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
          {/* Logo */}
          <Link href="/concorrente/acompanhamento" className="navbar-brand d-flex align-items-center">
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
              VV
            </span>
          </Link>

          {/* Menu Mobile e Perfil */}
          <div className="d-flex align-items-center gap-2">
            {/* Perfil Desktop */}
            <div className="dropdown d-none d-lg-block">
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
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: COLORS.gradientPrimary,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: `0 2px 6px ${COLORS.shadowLight}`
                  }}
                >
                  {userName?.charAt(0).toUpperCase() || 'C'}
                </div>
                
                <div className="text-start">
                  <div 
                    className="small fw-semibold"
                    style={{ color: COLORS.textPrimaryLight }}
                  >
                    {userName || 'Concorrente'}
                  </div>
                  <div 
                    className="x-small text-truncate"
                    style={{ 
                      color: COLORS.textMutedLight,
                      maxWidth: '150px'
                    }}
                  >
                    {userEmail || 'concorrente@email.com'}
                  </div>
                </div>
              </button>
              
              {isProfileOpen && (
                <div 
                  className="dropdown-menu show position-absolute end-0 mt-2"
                  style={{ 
                    minWidth: '200px',
                    border: `1px solid ${COLORS.borderLight}`,
                    boxShadow: `0 8px 24px ${COLORS.shadowLight}`,
                    borderRadius: '12px',
                    backgroundColor: COLORS.surfaceLight,
                    zIndex: 1050
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-header small fw-semibold" style={{ color: COLORS.textMutedLight }}>
                    Minha Conta
                  </div>
                  
                  <Link 
                    href="/concorrente/acompanhamento" 
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
                      <div className="x-small text-muted">Acompanhe sua inscrição</div>
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

            {/* Botão Mobile */}
            <button
              className="navbar-toggler border-0 p-0 d-lg-none"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ 
                color: COLORS.primary,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent'
              }}
              aria-label="Toggle navigation"
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.8rem' }}></i>
            </button>
          </div>

          {/* Menu Principal Desktop */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-3">
                <Link 
                  href="/concorrente/acompanhamento" 
                  className="nav-link d-flex align-items-center"
                  style={{ 
                    color: activePage === 'acompanhamento' ? COLORS.primary : COLORS.textPrimaryLight,
                    borderBottom: activePage === 'acompanhamento' ? `3px solid ${COLORS.primary}` : 'none',
                    fontWeight: activePage === 'acompanhamento' ? '600' : '500',
                    paddingBottom: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  <span>Meu Perfil</span>
                </Link>
              </li>
              
              <li className="nav-item mx-3">
                <Link 
                  href="/concorrente/concursos" 
                  className="nav-link d-flex align-items-center"
                  style={{ 
                    color: activePage === 'concursos' ? COLORS.primary : COLORS.textPrimaryLight,
                    borderBottom: activePage === 'concursos' ? `3px solid ${COLORS.primary}` : 'none',
                    fontWeight: activePage === 'concursos' ? '600' : '500',
                    paddingBottom: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className="bi bi-trophy me-2"></i>
                  <span>Meus Concursos</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
              style={{ zIndex: 1040 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <div 
              className="d-lg-none position-fixed top-0 end-0 h-100 d-flex flex-column bg-white"
              style={{ 
                width: '85%',
                maxWidth: '300px',
                boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
                zIndex: 1050
              }}
            >
              {/* Cabeçalho Mobile */}
              <div className="p-4 border-bottom">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: COLORS.gradientPrimary,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}
                  >
                    {userName?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                      {userName || 'Concorrente'}
                    </h6>
                    <p className="text-muted small mb-0">{userEmail || 'concorrente@email.com'}</p>
                  </div>
                </div>
              </div>

              {/* Menu Mobile */}
              <div className="flex-grow-1 p-3">
                <div className="nav flex-column">
                  <Link 
                    href="/concorrente/acompanhamento" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      color: activePage === 'acompanhamento' ? COLORS.primary : COLORS.textPrimaryLight,
                      backgroundColor: activePage === 'acompanhamento' ? `${COLORS.primary}10` : 'transparent',
                    }}
                  >
                    <i className="bi bi-person-circle me-3" style={{ width: '24px' }}></i>
                    <span className="fw-medium">Meu Perfil</span>
                  </Link>
                  
                  <Link 
                    href="/concorrente/concursos" 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ 
                      color: activePage === 'concursos' ? COLORS.primary : COLORS.textPrimaryLight,
                      backgroundColor: activePage === 'concursos' ? `${COLORS.primary}10` : 'transparent',
                    }}
                  >
                    <i className="bi bi-trophy me-3" style={{ width: '24px' }}></i>
                    <span className="fw-medium">Meus Concursos</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="mt-4 pt-3 border-top">
                  <button 
                    className="nav-link d-flex align-items-center py-3 px-3 rounded w-100 border-0 bg-transparent text-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    style={{ color: COLORS.error }}
                  >
                    <i className="bi bi-box-arrow-right me-3" style={{ width: '24px' }}></i>
                    <span className="fw-medium">Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Estilos */}
      <style jsx global>{`
        .dropdown-item:hover {
          background-color: ${COLORS.backgroundLight} !important;
          color: ${COLORS.primary} !important;
        }
        .nav-link:hover {
          color: ${COLORS.primary} !important;
        }
      `}</style>
    </>
  );
}