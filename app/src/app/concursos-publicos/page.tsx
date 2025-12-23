// app/concursos-publicos/page.tsx
'use client';

import { useState } from 'react';
import { PublicHeader } from '../../components/PublicHeader';
import { PublicFooter } from '../../components/PublicFooter';;
import { ConcursoPublicCard } from '../../components/concurso/ConcursoPublicCard';
import { useConcursosPublicos } from '../../hooks/concurso/useConcursosPublicos';
import { COLORS } from '@/constants/colors';

export default function ConcursosPublicosPage() {
  const { concursos, concursosAtivos, isLoading, error, refetch } = useConcursosPublicos();
  const [filtroTipo, setFiltroTipo] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  // Tipos disponíveis
  const tipos = ['TODOS', 'DJ', 'KARAOKE'];

  // Filtrar concursos
  const filteredConcursos = concursos.filter(concurso => {
    const matchesTipo = filtroTipo === 'TODOS' || concurso.tipoConcurso === filtroTipo;
    const matchesSearch = searchTerm === '' || 
      concurso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concurso.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concurso.nomeEntidade.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTipo && matchesSearch;
  });

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section 
        className="py-5"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.secondary}15 100%)`
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3" style={{ color: COLORS.textPrimaryLight }}>
                Descubra Competições Incríveis
              </h1>
              <p className="lead mb-4" style={{ color: COLORS.textSecondaryLight }}>
                Participe dos melhores concursos online, mostre seu talento e 
                concorra a prêmios especiais. Inscrições gratuitas e oportunidades únicas.
              </p>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                <div className="bg-white rounded-pill px-3 py-1 shadow-sm">
                  <span className="fw-semibold" style={{ color: COLORS.primary }}>
                    {concursosAtivos.length}
                  </span>
                  <span className="text-muted ms-2">Concursos Ativos</span>
                </div>
                <div className="bg-white rounded-pill px-3 py-1 shadow-sm">
                  <span className="fw-semibold" style={{ color: COLORS.success }}>
                    {concursos.filter(c => c.estado === 'ABERTO').length}
                  </span>
                  <span className="text-muted ms-2">Com Inscrições Abertas</span>
                </div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search" style={{ color: COLORS.primary }}></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar por nome, descrição ou organizador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    borderColor: COLORS.borderLight,
                    color: COLORS.textPrimaryLight
                  }}
                />
                <button 
                  className="btn"
                  onClick={() => setSearchTerm('')}
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  Limpar
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-3" style={{ color: COLORS.primary }}>
                    <i className="bi bi-info-circle me-2"></i>
                    Como Funciona
                  </h3>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: `${COLORS.primary}10` }}>
                        <div className="display-6 fw-bold mb-2" style={{ color: COLORS.primary }}>1</div>
                        <h6 className="fw-semibold mb-1">Escolha</h6>
                        <p className="text-muted x-small mb-0">Selecione um concurso</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: `${COLORS.secondary}10` }}>
                        <div className="display-6 fw-bold mb-2" style={{ color: COLORS.secondary }}>2</div>
                        <h6 className="fw-semibold mb-1">Inscreva-se</h6>
                        <p className="text-muted x-small mb-0">Preencha o formulário</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: `${COLORS.success}10` }}>
                        <div className="display-6 fw-bold mb-2" style={{ color: COLORS.success }}>3</div>
                        <h6 className="fw-semibold mb-1">Participe</h6>
                        <p className="text-muted x-small mb-0">Depende de cada concurso</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: `${COLORS.warning}10` }}>
                        <div className="display-6 fw-bold mb-2" style={{ color: COLORS.warning }}>4</div>
                        <h6 className="fw-semibold mb-1">Ganhe</h6>
                        <p className="text-muted x-small mb-0">Receba os prêmios</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="fw-medium me-2" style={{ color: COLORS.textPrimaryLight }}>
                  Filtrar por tipo:
                </span>
                <div className="btn-group" role="group">
                  {tipos.map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      className={`btn btn-sm ${filtroTipo === tipo ? '' : 'btn-outline-primary'}`}
                      style={{
                        backgroundColor: filtroTipo === tipo ? COLORS.primary : 'transparent',
                        color: filtroTipo === tipo ? 'white' : COLORS.primary,
                        borderColor: COLORS.primary,
                        fontWeight: '500'
                      }}
                      onClick={() => setFiltroTipo(tipo)}
                    >
                      {tipo === 'TODOS' ? 'Todos' : tipo}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-md-6 text-md-end">
              <div className="text-muted">
                {filteredConcursos.length} concurso{filteredConcursos.length !== 1 ? 's' : ''} encontrado{filteredConcursos.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Concursos */}
      <section className="py-5 flex-grow-1" style={{ backgroundColor: COLORS.backgroundLight }}>
        <div className="container">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: COLORS.primary, width: '3rem', height: '3rem' }}></div>
              <p className="mt-3 h5" style={{ color: COLORS.textPrimaryLight }}>
                Carregando concursos...
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
                  <h5 className="alert-heading mb-2">Erro ao carregar concursos</h5>
                  <p className="mb-0">{error}</p>
                </div>
              </div>
              <button 
                className="btn btn-primary mt-3"
                onClick={refetch}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Tentar Novamente
              </button>
            </div>
          ) : filteredConcursos.length === 0 ? (
            <div className="text-center py-5">
              <div className="card border-0 shadow-sm py-5">
                <div className="card-body">
                  <i 
                    className="bi bi-search display-1 mb-4"
                    style={{ color: `${COLORS.textSecondaryLight}50` }}
                  ></i>
                  <h3 className="h4 mb-3" style={{ color: COLORS.textPrimaryLight }}>
                    Nenhum concurso encontrado
                  </h3>
                  <p className="text-muted mb-4">
                    {searchTerm 
                      ? `Nenhum resultado para "${searchTerm}". Tente outros termos.`
                      : 'No momento não há concursos disponíveis.'}
                  </p>
                  <button 
                    className="btn"
                    style={{ 
                      background: COLORS.gradientPrimary,
                      color: 'white',
                      border: 'none',
                      fontWeight: '600'
                    }}
                    onClick={() => {
                      setSearchTerm('');
                      setFiltroTipo('TODOS');
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredConcursos.map((concurso) => (
                <div key={concurso.id} className="col-12 col-md-6 col-lg-4">
                  <ConcursoPublicCard concurso={concurso} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}