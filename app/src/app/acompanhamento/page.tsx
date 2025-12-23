// app/concorrente/acompanhamento/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthGuard } from '@/hooks/auth/useAuthGuard';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { ConcorrenteNavbar } from '@/components/concorrente/ConcorrenteNavbar';
import { StatusBadge } from '@/components/concorrente/StatusBadge';
import { useAcompanharInscricao } from '@/hooks/concorrente/useAcompanharInscricao';
import { COLORS } from '@/constants/colors';
import { EntidadeFooter } from '@/components/layout/EntidadeFooter';

export default function AcompanhamentoPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthGuard();
  const { user, logout } = useAuth();
  const { perfil, isLoading, error, refetch } = useAcompanharInscricao();

  // Redireciona se não for concorrente
  useEffect(() => {
    if (!authLoading && isAuthenticated && !user?.roles.includes('CONCORRENTE')) {
      router.push('/entidade');
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: COLORS.primary }}></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.roles.includes('CONCORRENTE')) {
    return null;
  }

  const getEstadoMensagem = (estado: string) => {
    switch (estado) {
      case 'APROVADO':
        return {
          titulo: 'Inscrição Aprovada! 🎉',
          mensagem: 'Parabéns! Sua inscrição foi aprovada. Você já pode participar do concurso.',
          dica: 'Agora você pode convidar amigos para votarem em você e aumentar suas chances de vencer.',
          icon: 'bi-check-circle-fill',
          color: COLORS.success
        };
      case 'REJEITADO':
        return {
          titulo: 'Inscrição Rejeitada 😔',
          mensagem: 'Infelizmente sua inscrição não foi aprovada pelos organizadores.',
          dica: 'Verifique se preencheu todos os campos corretamente ou entre em contato com o suporte.',
          icon: 'bi-x-circle-fill',
          color: COLORS.error
        };
      case 'PENDENTE':
      default:
        return {
          titulo: 'Aguardando Análise ⏳',
          mensagem: 'Sua inscrição está em análise pelos organizadores do concurso.',
          dica: 'O processo de análise geralmente leva de 24 a 48 horas. ',
          icon: 'bi-clock-fill',
          color: COLORS.warning
        };
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: COLORS.backgroundLight }}>
      {/* Navbar do Concorrente */}
      <ConcorrenteNavbar 
        userName={user?.email?.split('@')[0]}
        userEmail={user?.email}
      />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Cabeçalho */}
              <div className="mb-5">
                <h1 className="h2 fw-bold mb-3" style={{ color: COLORS.textPrimaryLight }}>
                  <i className="bi bi-person-badge me-3"></i>
                  Acompanhe Sua Inscrição
                </h1>
                <p className="text-muted mb-0">
                  Veja o status da sua inscrição e informações importantes
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" style={{ color: COLORS.primary, width: '3rem', height: '3rem' }}></div>
                  <p className="mt-3 h5" style={{ color: COLORS.textPrimaryLight }}>
                    Carregando suas informações...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-5">
                  <div 
                    className="alert alert-danger d-inline-flex align-items-center"
                    style={{ 
                      backgroundColor: `${COLORS.error}15`,
                      borderColor: COLORS.error,
                      color: COLORS.error
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                    <div>
                      <h5 className="alert-heading mb-2">Erro ao carregar informações</h5>
                      <p className="mb-0">{error.message}</p>
                      {error.status === 404 && (
                        <p className="mb-0 mt-2 small">
                          Você ainda não possui uma inscrição ativa.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {error.status === 404 && (
                    <div className="mt-4">
                      <button 
                        className="btn me-3"
                        style={{ 
                          background: COLORS.gradientPrimary,
                          color: 'white',
                          border: 'none',
                          fontWeight: '600'
                        }}
                        onClick={() => router.push('/concursos-publicos')}
                      >
                        <i className="bi bi-search me-2"></i>
                        Encontrar Concursos
                      </button>
                      <button 
                        className="btn"
                        onClick={refetch}
                        style={{ 
                          backgroundColor: COLORS.surfaceLight,
                          color: COLORS.textPrimaryLight,
                          border: `1px solid ${COLORS.borderLight}`,
                          fontWeight: '600'
                        }}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Tentar Novamente
                      </button>
                    </div>
                  )}
                </div>
              ) : perfil ? (
                <div className="row">
                  {/* Card de Perfil */}
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body p-4 d-flex flex-column align-items-center text-center">
                        {/* Foto de Perfil */}
                        <div className="mb-4">
                          {perfil.fotoPerfil ? (
                            <img
                              src={perfil.fotoPerfil}
                              alt={perfil.nome}
                              className="rounded-circle border"
                              style={{ 
                                width: '120px', 
                                height: '120px', 
                                objectFit: 'cover',
                                borderColor: `${COLORS.primary}30 !important`
                              }}
                            />
                          ) : (
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center mx-auto border"
                              style={{ 
                                width: '120px', 
                                height: '120px',
                                background: COLORS.gradientPrimary,
                                color: 'white',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                borderColor: `${COLORS.primary}30`
                              }}
                            >
                              {perfil.nome?.charAt(0).toUpperCase() || 'C'}
                            </div>
                          )}
                        </div>

                        {/* Nome e Email */}
                        <h3 className="h4 fw-bold mb-2" style={{ color: COLORS.textPrimaryLight }}>
                          {perfil.nome}
                        </h3>
                        <p className="text-muted mb-4">
                          <i className="bi bi-envelope me-2"></i>
                          {perfil.email}
                        </p>

                        {/* Status */}
                        <div className="mb-4">
                          <StatusBadge estado={perfil.estado} size="lg" />
                        </div>

                     
                      </div>
                    </div>
                  </div>

                  {/* Card de Status e Informações */}
                  <div className="col-lg-8">
                    {/* Card de Status */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-body p-4">
                        {(() => {
                          const estadoInfo = getEstadoMensagem(perfil.estado);
                          return (
                            <>
                              <div className="d-flex align-items-start mb-4">
                                <i 
                                  className={`bi ${estadoInfo.icon} me-3`}
                                  style={{ 
                                    color: estadoInfo.color,
                                    fontSize: '2.5rem',
                                    marginTop: '2px'
                                  }}
                                ></i>
                                <div>
                                  <h4 className="h5 fw-bold mb-2" style={{ color: estadoInfo.color }}>
                                    {estadoInfo.titulo}
                                  </h4>
                                  <p className="text-muted mb-0">{estadoInfo.mensagem}</p>
                                </div>
                              </div>
                              
                              <div 
                                className="alert alert-info"
                                style={{ 
                                  backgroundColor: `${COLORS.info}10`,
                                  borderColor: COLORS.infoLight,
                                  color: COLORS.textPrimaryLight
                                }}
                              >
                                <h6 className="alert-heading mb-2">
                                  <i className="bi bi-lightbulb me-2"></i>
                                  Dica Importante
                                </h6>
                                <p className="mb-0">{estadoInfo.dica}</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Card de Ações 
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="h6 fw-bold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                          <i className="bi bi-lightning-charge me-2"></i>
                          Ações Disponíveis
                        </h5>
                        
                        <div className="row g-3">
                          {perfil.estado === 'APROVADO' && (
                            <>
                              <div className="col-md-6">
                                <button
                                  className="btn w-100 d-flex align-items-center justify-content-center p-3"
                                  style={{ 
                                    background: COLORS.gradientPrimary,
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: '600'
                                  }}
                                  onClick={() => router.push('/concorrente/concursos')}
                                >
                                  <i className="bi bi-share me-3 fs-4"></i>
                                  <div className="text-start">
                                    <div className="fw-bold">Compartilhar</div>
                                    <small>Convide amigos para votar</small>
                                  </div>
                                </button>
                              </div>
                              
                              <div className="col-md-6">
                                <button
                                  className="btn w-100 d-flex align-items-center justify-content-center p-3"
                                  style={{ 
                                    backgroundColor: COLORS.surfaceLight,
                                    color: COLORS.textPrimaryLight,
                                    border: `1px solid ${COLORS.borderLight}`,
                                    fontWeight: '600'
                                  }}
                                  onClick={() => router.push('/concorrente/concursos')}
                                >
                                  <i className="bi bi-bar-chart me-3 fs-4"></i>
                                  <div className="text-start">
                                    <div className="fw-bold">Ver Ranking</div>
                                    <small>Acompanhe sua posição</small>
                                  </div>
                                </button>
                              </div>
                            </>
                          )}
                          
                          <div className="col-md-6">
                            <button
                              className="btn w-100 d-flex align-items-center justify-content-center p-3"
                              style={{ 
                                backgroundColor: perfil.estado === 'PENDENTE' ? `${COLORS.warning}15` : COLORS.surfaceLight,
                                color: perfil.estado === 'PENDENTE' ? COLORS.warning : COLORS.textPrimaryLight,
                                border: `1px solid ${perfil.estado === 'PENDENTE' ? COLORS.warning : COLORS.borderLight}`,
                                fontWeight: '600'
                              }}
                              onClick={refetch}
                            >
                              <i className="bi bi-arrow-clockwise me-3 fs-4"></i>
                              <div className="text-start">
                                <div className="fw-bold">Atualizar Status</div>
                                <small>Verifique novamente</small>
                              </div>
                            </button>
                          </div>
                          
                          <div className="col-md-6">
                            <button
                              className="btn w-100 d-flex align-items-center justify-content-center p-3"
                              style={{ 
                                backgroundColor: COLORS.surfaceLight,
                                color: COLORS.textPrimaryLight,
                                border: `1px solid ${COLORS.borderLight}`,
                                fontWeight: '600'
                              }}
                              onClick={() => router.push('/concursos-publicos')}
                            >
                              <i className="bi bi-search me-3 fs-4"></i>
                              <div className="text-start">
                                <div className="fw-bold">Ver Concursos</div>
                                <small>Encontre novas oportunidades</small>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
*/}
                    {/* Card de Timeline (Status histórico) */}
                    <div className="card border-0 shadow-sm mt-4">
                      <div className="card-body p-4">
                        <h5 className="h6 fw-bold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                          <i className="bi bi-clock-history me-2"></i>
                          Linha do Tempo
                        </h5>
                        
                        <div className="timeline">
                          <div className="timeline-item">
                            <div className="d-flex">
                              <div className="timeline-marker">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ 
                                    width: '24px', 
                                    height: '24px',
                                    backgroundColor: COLORS.success,
                                    color: 'white'
                                  }}
                                >
                                  <i className="bi bi-check-lg small"></i>
                                </div>
                              </div>
                              <div className="timeline-content ms-4">
                                <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                                  Inscrição Realizada
                                </h6>
                                <p className="text-muted small mb-0">Sua inscrição foi enviada com sucesso</p>
                                <small className="text-muted">Há alguns momentos</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="timeline-item">
                            <div className="d-flex">
                              <div className="timeline-marker">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center"
                                  style={{ 
                                    width: '24px', 
                                    height: '24px',
                                    backgroundColor: perfil.estado === 'PENDENTE' ? COLORS.warning : 
                                                   perfil.estado === 'APROVADO' ? COLORS.success : COLORS.error,
                                    color: 'white'
                                  }}
                                >
                                  <i className={`bi ${
                                    perfil.estado === 'PENDENTE' ? 'bi-clock' :
                                    perfil.estado === 'APROVADO' ? 'bi-check-lg' : 'bi-x-lg'
                                  } small`}></i>
                                </div>
                              </div>
                              <div className="timeline-content ms-4">
                                <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                                  {perfil.estado === 'PENDENTE' ? 'Em Análise' : 
                                   perfil.estado === 'APROVADO' ? 'Inscrição Aprovada' : 'Inscrição Rejeitada'}
                                </h6>
                                <p className="text-muted small mb-0">
                                  {perfil.estado === 'PENDENTE' ? 'Aguardando avaliação dos organizadores' :
                                   perfil.estado === 'APROVADO' ? 'Sua inscrição foi aprovada! 🎉' :
                                   'Sua inscrição não foi aprovada pelos critérios do concurso'}
                                </p>
                                <small className="text-muted">
                                  {perfil.estado === 'PENDENTE' ? 'Aguardando...' : 'Status atual'}
                                </small>
                              </div>
                            </div>
                          </div>
                          
                          {perfil.estado === 'APROVADO' && (
                            <div className="timeline-item">
                              <div className="d-flex">
                                <div className="timeline-marker">
                                  <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center border"
                                    style={{ 
                                      width: '24px', 
                                      height: '24px',
                                      backgroundColor: 'transparent',
                                      borderColor: `${COLORS.primary}30 !important`,
                                      color: COLORS.textMutedLight
                                    }}
                                  >
                                    <i className="bi bi-trophy small"></i>
                                  </div>
                                </div>
                                <div className="timeline-content ms-4">
                                  <h6 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                                    Próxima Etapa: Votação
                                  </h6>
                                  <p className="text-muted small mb-0">Participe da votação e conquiste a vitória!</p>
                                  <small className="text-muted">Em breve...</small>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="card border-0 shadow-sm py-5">
                    <div className="card-body">
                      <i 
                        className="bi bi-person-plus display-1 mb-4"
                        style={{ color: `${COLORS.textSecondaryLight}50` }}
                      ></i>
                      <h3 className="h4 mb-3" style={{ color: COLORS.textPrimaryLight }}>
                        Nenhuma inscrição encontrada
                      </h3>
                      <p className="text-muted mb-4">
                        Você ainda não possui inscrições ativas. 
                        Encontre um concurso interessante e inscreva-se!
                      </p>
                      <button 
                        className="btn"
                        style={{ 
                          background: COLORS.gradientPrimary,
                          color: 'white',
                          border: 'none',
                          fontWeight: '600',
                          padding: '0.75rem 1.5rem'
                        }}
                        onClick={() => router.push('/concursos-publicos')}
                      >
                        <i className="bi bi-search me-2"></i>
                        Encontrar Concursos
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <EntidadeFooter compact />

      {/* Estilos */}
      <style jsx global>{`
        .timeline {
          position: relative;
          padding-left: 0;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 1.5rem;
        }
        
        .timeline-item:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 24px;
          bottom: 0;
          width: 2px;
          background: ${COLORS.borderLight};
        }
        
        .timeline-marker {
          position: relative;
          z-index: 2;
        }
        
        .card:hover {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}