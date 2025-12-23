// app/entidade/concursos/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthGuard } from '@/hooks/auth/useAuthGuard';
import { EntidadeNavbar } from '@/components/layout/EntidadeNavbar';
import { ConcorrenteCard } from '@/components/concorrente/ConcorrenteCard';
import { useConcorrentesConcurso } from '@/hooks/concorrente/useConcorrentesConcurso';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { useConcursosEntidade } from '@/hooks/concurso/useConcursosEntidade';
import { EntidadeFooter } from '@/components/layout/EntidadeFooter';

export default function ConcursoInscritosPage() {
  const params = useParams();
  const router = useRouter();
  const concursoId = Number(params.id);
  
  const { isAuthenticated, isLoading: authLoading } = useAuthGuard();
  const { user } = useAuth();
  const { concursos } = useConcursosEntidade();
  
  const { concorrentes, isLoading, error, refetch } = useConcorrentesConcurso(concursoId);
  const [filtroEstado, setFiltroEstado] = useState<'TODOS' | 'PENDENTE' | 'APROVADO' | 'REJEITADO'>('TODOS');
  
  const [concursoAtual, setConcursoAtual] = useState<any>(null);
 
  // Buscar informações do concurso atual
  useEffect(() => {
    if (concursos.length > 0 && concursoId) {
      const concurso = concursos.find(c => c.id === concursoId);
      setConcursoAtual(concurso);
    }
  }, [concursos, concursoId]);

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: COLORS.primary }}></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.roles.includes('ENTIDADE')) {
    return null;
  }

  if (!concursoId || isNaN(concursoId)) {
    router.push('/entidade');
    return null;
  }

  const concorrentesFiltrados = filtroEstado === 'TODOS' 
    ? concorrentes 
    : concorrentes.filter(c => c.estado === filtroEstado);

  const contarPorEstado = (estado: string) => 
    concorrentes.filter(c => c.estado === estado).length;

  return (
    <div className="min-vh-100" style={{ backgroundColor: COLORS.backgroundLight }}>
      {/* Navbar Atualizado */}
    <EntidadeNavbar 
  userName={user?.email?.split('@')[0]}
  userEmail={user?.email}
/>

      {/* Conteúdo Principal */}
      <main className="container-fluid py-4">
        {/* Cabeçalho com Breadcrumb */}
        <div className="row mb-4">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-3">
                <li className="breadcrumb-item">
                  <a 
                    href="/entidade" 
                    style={{ color: COLORS.primary, textDecoration: 'none' }}
                  >
                    <i className="bi bi-house-door me-1"></i>
                    Meus Concursos
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {concursoAtual?.nome || 'Concurso'} - Inscritos
                </li>
              </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h2 fw-bold" style={{ color: COLORS.textPrimaryLight }}>
                  {concursoAtual?.nome || 'Concurso'} 
                  <span className="text-muted ms-2 fw-normal">| Inscrições</span>
                </h1>
                <p className="text-muted mb-0">
                  Gerencie as inscrições dos concorrentes
                </p>
              </div>
              
              <button 
                className="btn"
                onClick={() => router.back()}
                style={{ 
                  backgroundColor: COLORS.surfaceLight,
                  color: COLORS.textPrimaryLight,
                  border: `1px solid ${COLORS.borderLight}`,
                  fontWeight: '600'
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Voltar
              </button>
            </div>

            {/* Cards de Resumo */}
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm" style={{ borderTop: `4px solid ${COLORS.primary}` }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Total</h6>
                        <h3 className="fw-bold mb-0">{concorrentes.length}</h3>
                      </div>
                      <i className="bi bi-people display-6" style={{ color: `${COLORS.primary}30` }}></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm" style={{ borderTop: `4px solid ${COLORS.warning}` }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Pendentes</h6>
                        <h3 className="fw-bold mb-0">{contarPorEstado('PENDENTE')}</h3>
                      </div>
                      <i className="bi bi-clock display-6" style={{ color: `${COLORS.warning}30` }}></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm" style={{ borderTop: `4px solid ${COLORS.success}` }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Aprovados</h6>
                        <h3 className="fw-bold mb-0">{contarPorEstado('APROVADO')}</h3>
                      </div>
                      <i className="bi bi-check-circle display-6" style={{ color: `${COLORS.success}30` }}></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card border-0 shadow-sm" style={{ borderTop: `4px solid ${COLORS.error}` }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Rejeitados</h6>
                        <h3 className="fw-bold mb-0">{contarPorEstado('REJEITADO')}</h3>
                      </div>
                      <i className="bi bi-x-circle display-6" style={{ color: `${COLORS.error}30` }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <span className="me-3 fw-medium">Filtrar por estado:</span>
                      <div className="btn-group" role="group">
                        {['TODOS', 'PENDENTE', 'APROVADO', 'REJEITADO'].map((estado) => (
                          <button
                            key={estado}
                            type="button"
                            className={`btn btn-sm ${filtroEstado === estado ? '' : 'btn-outline-primary'}`}
                            style={{
                              backgroundColor: filtroEstado === estado ? COLORS.primary : 'transparent',
                              color: filtroEstado === estado ? 'white' : COLORS.primary,
                              borderColor: COLORS.primary,
                              fontWeight: filtroEstado === estado ? '600' : '500'
                            }}
                            onClick={() => setFiltroEstado(estado as any)}
                          >
                            {estado === 'TODOS' ? 'Todos' : estado}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 text-end">
                    <div className="text-muted small">
                      {concorrentesFiltrados.length} concorrente{concorrentesFiltrados.length !== 1 ? 's' : ''} encontrado{concorrentesFiltrados.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Concorrentes */}
        <div className="row">
          {isLoading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" style={{ color: COLORS.primary }}></div>
              <p className="mt-3 text-muted">Carregando concorrentes...</p>
            </div>
          ) : error ? (
            <div className="col-12">
              <div 
                className="alert alert-danger d-flex align-items-center"
                style={{ 
                  backgroundColor: `${COLORS.error}15`,
                  borderColor: COLORS.error,
                  color: COLORS.error
                }}
              >
                <i className="bi bi-exclamation-triangle-fill me-3"></i>
                <div>
                  <strong>Erro ao carregar concorrentes:</strong>
                  <p className="mb-0">{error}</p>
                </div>
                <button 
                  className="btn btn-sm ms-auto"
                  style={{ color: COLORS.error }}
                  onClick={refetch}
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          ) : concorrentesFiltrados.length === 0 ? (
            <div className="col-12">
              <div className="card border-0 shadow-sm text-center py-5">
                <div className="card-body">
                  <i 
                    className="bi bi-person-slash display-1 mb-4"
                    style={{ color: `${COLORS.textSecondaryLight}50` }}
                  ></i>
                  <h3 className="h4 mb-3" style={{ color: COLORS.textPrimaryLight }}>
                    Nenhum concorrente encontrado
                  </h3>
                  <p className="text-muted mb-4">
                    {filtroEstado === 'TODOS' 
                      ? 'Ainda não há concorrentes inscritos neste concurso.'
                      : `Nenhum concorrente com estado "${filtroEstado.toLowerCase()}" encontrado.`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            concorrentesFiltrados.map((concorrente) => (
              <div key={concorrente.userId} className="col-12 col-md-6 col-lg-4 mb-4">
                <ConcorrenteCard 
                  concorrente={concorrente}
                  concursoId={concursoId}
                  onEstadoAtualizado={refetch}
                />
              </div>
            ))
          )}
        </div>
      </main>
       <EntidadeFooter compact />
    </div>
  );
}