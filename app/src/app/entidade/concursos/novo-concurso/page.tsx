// app/entidade/novo-concurso/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthGuard } from '@/hooks/auth/useAuthGuard';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { EntidadeNavbar } from '@/components/layout/EntidadeNavbar';
import { useCriarConcurso } from '@/hooks/concurso/useCriarConcurso';
import { COLORS } from '@/constants/colors';
import { TipoConcurso } from '@/types/concurso/concurso';

export default function NovoConcursoPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthGuard();
  const { user } = useAuth();
  const { criar, isLoading, error, clearError } = useCriarConcurso();
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valorMinimoVoto: 50,
    tipoConcurso: 'DJ' as TipoConcurso,
    dataInicioVotacao: '',
    dataFimVotacao: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'valorMinimoVoto') {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (error) clearError();
    if (successMessage) setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim()) {
      alert('Por favor, insira um nome para o concurso');
      return;
    }
    
    if (!formData.dataInicioVotacao || !formData.dataFimVotacao) {
      alert('Por favor, selecione as datas de início e fim da votação');
      return;
    }
    
    const inicio = new Date(formData.dataInicioVotacao);
    const fim = new Date(formData.dataFimVotacao);
    
    if (fim <= inicio) {
      alert('A data de fim deve ser posterior à data de início');
      return;
    }
    
    if (formData.valorMinimoVoto < 1) {
      alert('O valor mínimo do voto deve ser pelo menos 1 MT');
      return;
    }

    try {
      const resultado = await criar(formData);
      
      if (resultado) {
        setSuccessMessage(`Concurso "${resultado.nome}" criado com sucesso! Redirecionando...`);
      }
    } catch (error) {
      console.error('Erro ao criar concurso:', error);
    }
  };

  const tipoConcursoOptions: Array<{ value: TipoConcurso; label: string; icon: string }> = [
    { value: 'DJ', label: 'DJ ', icon: 'bi-music-note-beamed' },
    { value: 'KARAOKE', label: 'Karaokê', icon: 'bi-mic' }
  ];

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

  return (
    <div className="min-vh-100" style={{ backgroundColor: COLORS.backgroundLight }}>
      {/* Navbar */}
      <EntidadeNavbar 
        userName={user?.email?.split('@')[0]}
        userEmail={user?.email}
      />

      {/* Conteúdo Principal */}
      <main className="container py-4">
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
                  Novo Concurso
                </li>
              </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h2 fw-bold" style={{ color: COLORS.textPrimaryLight }}>
                  Criar Novo Concurso
                </h1>
                <p className="text-muted mb-0">
                  Preencha os detalhes para criar um concurso atraente
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
          </div>
        </div>

        {/* Formulário */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {successMessage && (
                  <div 
                    className="alert alert-success d-flex align-items-center mb-4 animate__animated animate__fadeIn"
                    role="alert"
                    style={{ 
                      backgroundColor: `${COLORS.success}15`,
                      borderColor: COLORS.success,
                      color: COLORS.success
                    }}
                  >
                    <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                    <div className="fw-medium">{successMessage}</div>
                  </div>
                )}

                {error && (
                  <div 
                    className="alert alert-danger d-flex align-items-center mb-4 animate__animated animate__fadeIn"
                    role="alert"
                    style={{ 
                      backgroundColor: `${COLORS.error}15`,
                      borderColor: COLORS.error,
                      color: COLORS.error
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                    <div>
                      <strong>Erro ao criar concurso:</strong>
                      <p className="mb-0">{error.message}</p>
                      {error.field && (
                        <small className="d-block mt-1">Campo: {error.field}</small>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Nome do Concurso */}
                  <div className="mb-4">
                    <label htmlFor="nome" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                      <i className="bi bi-trophy me-2"></i>
                      Nome do Concurso *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="form-control form-control-lg"
                      placeholder="Ex: Karaokê Superstar 2025"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      style={{ 
                        borderColor: COLORS.borderLight,
                        backgroundColor: COLORS.surfaceLight,
                        color: COLORS.textPrimaryLight
                      }}
                    />
                    <small className="text-muted mt-1 d-block">
                      Dê um nome atrativo para o seu concurso
                    </small>
                  </div>

                  {/* Descrição */}
                  <div className="mb-4">
                    <label htmlFor="descricao" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                      <i className="bi bi-card-text me-2"></i>
                      Descrição *
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      className="form-control"
                      placeholder="Descreva o seu concurso de forma detalhada..."
                      rows={4}
                      value={formData.descricao}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      style={{ 
                        borderColor: COLORS.borderLight,
                        backgroundColor: COLORS.surfaceLight,
                        color: COLORS.textPrimaryLight,
                        resize: 'vertical'
                      }}
                    />
                    <small className="text-muted mt-1 d-block">
                      Descreva as regras, prêmios e outras informações importantes
                    </small>
                  </div>

                  {/* Tipo de Concurso e Valor Mínimo */}
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="tipoConcurso" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-tags me-2"></i>
                        Tipo de Concurso *
                      </label>
                      <div className="dropdown">
                        <select
                          id="tipoConcurso"
                          name="tipoConcurso"
                          className="form-select"
                          value={formData.tipoConcurso}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          style={{ 
                            borderColor: COLORS.borderLight,
                            backgroundColor: COLORS.surfaceLight,
                            color: COLORS.textPrimaryLight
                          }}
                        >
                          {tipoConcursoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              <i className={`bi ${option.icon} me-2`}></i>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <small className="text-muted mt-1 d-block">
                        Escolha o tipo de competição
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="valorMinimoVoto" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-cash-coin me-2"></i>
                        Valor Mínimo do Voto (MT) *
                      </label>
                      <div className="input-group">
                        <span 
                          className="input-group-text"
                          style={{ 
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            borderColor: COLORS.primary
                          }}
                        >
                          MT
                        </span>
                        <input
                          type="number"
                          id="valorMinimoVoto"
                          name="valorMinimoVoto"
                          className="form-control"
                          placeholder="50"
                          min="1"
                          step="1"
                          value={formData.valorMinimoVoto}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          style={{ 
                            borderColor: COLORS.borderLight,
                            backgroundColor: COLORS.surfaceLight,
                            color: COLORS.textPrimaryLight
                          }}
                        />
                      </div>
                      <small className="text-muted mt-1 d-block">
                        Valor mínimo que um usuário pode doar por voto
                      </small>
                    </div>
                  </div>

                  {/* Datas de Votação */}
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="dataInicioVotacao" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-calendar-event me-2"></i>
                        Data de Início *
                      </label>
                      <input
                        type="datetime-local"
                        id="dataInicioVotacao"
                        name="dataInicioVotacao"
                        className="form-control"
                        value={formData.dataInicioVotacao}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        style={{ 
                          borderColor: COLORS.borderLight,
                          backgroundColor: COLORS.surfaceLight,
                          color: COLORS.textPrimaryLight
                        }}
                      />
                      <small className="text-muted mt-1 d-block">
                        Quando as inscrições/votações começam
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dataFimVotacao" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-calendar-x me-2"></i>
                        Data de Fim *
                      </label>
                      <input
                        type="datetime-local"
                        id="dataFimVotacao"
                        name="dataFimVotacao"
                        className="form-control"
                        value={formData.dataFimVotacao}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        style={{ 
                          borderColor: COLORS.borderLight,
                          backgroundColor: COLORS.surfaceLight,
                          color: COLORS.textPrimaryLight
                        }}
                      />
                      <small className="text-muted mt-1 d-block">
                        Quando as inscrições/votações terminam
                      </small>
                    </div>
                  </div>

                  {/* Preview Card */}
                  <div className="card mb-4 border" style={{ borderColor: COLORS.borderLight, backgroundColor: `${COLORS.primary}05` }}>
                    <div className="card-body">
                      <h5 className="card-title fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-eye me-2"></i>
                        Prévia do Concurso
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="mb-1">
                            <strong style={{ color: COLORS.primary }}>Nome:</strong>{' '}
                            <span className="text-muted">{formData.nome || '(Não definido)'}</span>
                          </p>
                          <p className="mb-1">
                            <strong style={{ color: COLORS.primary }}>Tipo:</strong>{' '}
                            <span className="text-muted">
                              {formData.tipoConcurso === 'DJ' ? 'DJ ' : 'Karaokê'}
                            </span>
                          </p>
                          <p className="mb-1">
                            <strong style={{ color: COLORS.primary }}>Valor Mínimo:</strong>{' '}
                            <span className="text-muted">{formData.valorMinimoVoto} MT</span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-1">
                            <strong style={{ color: COLORS.primary }}>Início:</strong>{' '}
                            <span className="text-muted">
                              {formData.dataInicioVotacao 
                                ? new Date(formData.dataInicioVotacao).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : '(Não definido)'}
                            </span>
                          </p>
                          <p className="mb-1">
                            <strong style={{ color: COLORS.primary }}>Fim:</strong>{' '}
                            <span className="text-muted">
                              {formData.dataFimVotacao 
                                ? new Date(formData.dataFimVotacao).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : '(Não definido)'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="d-flex justify-content-between pt-3 border-top">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => router.back()}
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: COLORS.surfaceLight,
                        color: COLORS.textPrimaryLight,
                        border: `1px solid ${COLORS.borderLight}`,
                        fontWeight: '600',
                        padding: '0.75rem 1.5rem'
                      }}
                    >
                      <i className="bi bi-x-lg me-2"></i>
                      Cancelar
                    </button>
                    
                    <button
                      type="submit"
                      className="btn"
                      disabled={isLoading}
                      style={{ 
                        background: COLORS.gradientPrimary,
                        color: 'white',
                        border: 'none',
                        fontWeight: '600',
                        padding: '0.75rem 1.5rem',
                        minWidth: '150px'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Criando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-plus-lg me-2"></i>
                          Criar Concurso
                        </>
                      )}
                    </button>
                  </div>

                  {/* Informações Adicionais 
                  <div className="mt-4 pt-3 border-top">
                    <div className="alert alert-info" style={{ 
                      backgroundColor: `${COLORS.info}10`,
                      borderColor: COLORS.infoLight,
                      color: COLORS.textPrimaryLight
                    }}>
                      <h6 className="alert-heading mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Informações Importantes
                      </h6>
                      <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
                        <li>O concurso será criado com status <strong>PENDENTE</strong></li>
                        <li>Após aprovação, ele aparecerá como <strong>ABERTO</strong></li>
                        <li>O valor mínimo do voto não pode ser alterado após a criação</li>
                        <li>As datas podem ser ajustadas enquanto o concurso estiver pendente</li>
                      </ul>
                    </div>
                  </div>*/}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Estilos inline */}
      <style jsx global>{`
        .form-control:focus, .form-select:focus {
          border-color: ${COLORS.primary} !important;
          box-shadow: 0 0 0 0.25rem ${COLORS.primary}25 !important;
        }
        
        .animate__animated {
          animation-duration: 0.5s;
        }
      `}</style>
    </div>
  );
}