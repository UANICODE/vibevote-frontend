// app/entidade/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useAuthGuard } from '@/hooks/auth/useAuthGuard';
import { EntidadeNavbar } from '@/components/layout/EntidadeNavbar';
import { ConcursoCard } from '@/components/concurso/ConcursoCard';
import { useConcursosEntidade } from '../../hooks/concurso/useConcursosEntidade';
import { ConcursoEstado } from '@/types/concurso';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { EntidadeFooter } from '@/components/layout/EntidadeFooter';


export default function EntidadeDashboardPage() {
  // Protege a rota e redireciona se não for ENTIDADE
  const { isAuthenticated, isLoading: authLoading } = useAuthGuard();
  const { user } = useAuth();
    const router = useRouter(); // Adicione esta linha
  const { concursos, isLoading, error, refetch } = useConcursosEntidade();
  const [filterEstado, setFilterEstado] = useState<ConcursoEstado | 'TODOS'>('TODOS');

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: COLORS.primary }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O hook já redirecionou
  }

  // Verifica se o usuário tem role ENTIDADE
  if (!user?.roles.includes('ENTIDADE')) {
    // Redireciona para a página do concorrente
    if (typeof window !== 'undefined') {
      window.location.href = '/concorrente/dashboard';
    }
    return null;
  }

  const filteredConcursos = filterEstado === 'TODOS' 
    ? concursos 
    : concursos.filter(c => c.estado === filterEstado);

  const estados: Array<ConcursoEstado | 'TODOS'> = ['TODOS', 'ABERTO', 'PENDENTE', 'ENCERRADO'];

  return (
    <div className="min-vh-100" style={{ backgroundColor: COLORS.backgroundLight }}>
      {/* Navbar */}
   <EntidadeNavbar 
  userName={user?.email?.split('@')[0]}
  userEmail={user?.email}
/>

      {/* Conteúdo Principal */}
      <main className="container-fluid py-4">
        {/* Cabeçalho e Filtros */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h2 fw-bold" style={{ color: COLORS.textPrimaryLight }}>
                  Meus Concursos
                </h1>
                <p className="text-muted mb-0">
                  Gerencie todos os concursos
                </p>
              </div>
              
              <button 
                className="btn"
                style={{ 
                  background: COLORS.gradientPrimary,
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem'
                }}
                onClick={() => router.push('/entidade/concursos/novo-concurso')}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Novo Concurso
              </button>
            </div>

            {/* Filtros */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <span className="me-3 fw-medium">Filtrar por:</span>
                      <div className="btn-group" role="group">
                        {estados.map((estado) => (
                          <button
                            key={estado}
                            type="button"
                            className={`btn btn-sm ${filterEstado === estado ? '' : 'btn-outline-primary'}`}
                            style={{
                              backgroundColor: filterEstado === estado ? COLORS.primary : 'transparent',
                              color: filterEstado === estado ? 'white' : COLORS.primary,
                              borderColor: COLORS.primary,
                              fontWeight: filterEstado === estado ? '600' : '500'
                            }}
                            onClick={() => setFilterEstado(estado)}
                          >
                            {estado === 'TODOS' ? 'Todos' : estado}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 text-end">
                    <div className="text-muted small">
                      {filteredConcursos.length} concurso{filteredConcursos.length !== 1 ? 's' : ''} encontrado{filteredConcursos.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Concursos */}
        <div className="row">
          {isLoading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border" style={{ color: COLORS.primary }}></div>
              <p className="mt-3 text-muted">Carregando concursos...</p>
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
                  <strong>Erro ao carregar concursos:</strong>
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
          ) : filteredConcursos.length === 0 ? (
            <div className="col-12">
              <div className="card border-0 shadow-sm text-center py-5">
                <div className="card-body">
                  <i 
                    className="bi bi-trophy display-1 mb-4"
                    style={{ color: `${COLORS.textSecondaryLight}50` }}
                  ></i>
                  <h3 className="h4 mb-3" style={{ color: COLORS.textPrimaryLight }}>
                    Nenhum concurso encontrado
                  </h3>
                  <p className="text-muted mb-4">
                    {filterEstado === 'TODOS' 
                      ? 'Você ainda não criou nenhum concurso.'
                      : `Nenhum concurso com estado "${filterEstado.toLowerCase()}" encontrado.`}
                  </p>
                  <button 
                    className="btn"
                    style={{ 
                      background: COLORS.gradientPrimary,
                      color: 'white',
                      border: 'none',
                      fontWeight: '600'
                    }}
                    onClick={() => router.push('/entidade/concursos/novo-concurso')}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Criar Primeiro Concurso
                  </button>
                </div>
              </div>
            </div>
          ) : (
            filteredConcursos.map((concurso) => (
              <div key={concurso.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <ConcursoCard 
                  concurso={concurso}
                onClick={() => router.push(`/entidade/concursos/${concurso.id}`)}
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