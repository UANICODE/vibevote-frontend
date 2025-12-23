// components/concurso/ConcursoCard.tsx
'use client';

import { ConcursoDTO } from '@/types/concurso';
import { COLORS } from '@/constants/colors';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useMarcarConcursoAberto } from '@/hooks/concurso/useMarcarConcursoAberto';
import { useState } from 'react';

interface ConcursoCardProps {
  concurso: ConcursoDTO;
  onConcursoAberto?: (concursoId: number) => void;
  onClick?: () => void;
}

export function ConcursoCard({ concurso, onConcursoAberto, onClick }: ConcursoCardProps) {
  const router = useRouter();
  const { marcar, isLoading, error, success, clear } = useMarcarConcursoAberto();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const getEstadoColor = () => {
    switch (concurso.estado) {
      case 'ABERTO': return COLORS.success;
      case 'ENCERRADO': return COLORS.error;
      case 'PENDENTE': return COLORS.warning;
      default: return COLORS.textSecondaryLight;
    }
  };

  const formatDate = (dateInput: string | Date) => {
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return format(date, "dd 'de' MMM 'de' yyyy • HH:mm", { locale: ptBR });
  } catch {
    return '-';
  }
};


  const handleAbrirInscricoes = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!window.confirm('Tem certeza que deseja abrir as inscrições deste concurso?\nEsta ação não pode ser desfeita.')) {
      return;
    }

    const resultado = await marcar(concurso.id);
    
    if (resultado) {
      setShowSuccess(true);
      setShowError(false);
      
      // Notificar componente pai sobre a atualização
      if (onConcursoAberto) {
        onConcursoAberto(concurso.id);
      }
      
      // Auto-ocultar mensagem após 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        clear();
      }, 3000);
    }
  };

  const isPendente = concurso.estado === 'PENDENTE';
  const isAberto = concurso.estado === 'ABERTO';

  return (
    <div 
      className="card h-100 shadow-sm border-0 hover-lift position-relative"
      onClick={onClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.shadowLight}`;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      {/* Overlay de carregamento */}
      {isLoading && (
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10,
            borderRadius: 'inherit'
          }}
        >
          <div className="spinner-border" style={{ color: COLORS.primary }}></div>
          <span className="ms-2 fw-medium" style={{ color: COLORS.primary }}>
            Abrindo...
          </span>
        </div>
      )}

      <div className="card-body">
        {/* Cabeçalho com estado */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title fw-bold mb-0" style={{ color: COLORS.textPrimaryLight }}>
            {concurso.nome}
          </h5>
          <span 
            className="badge rounded-pill px-3 py-2"
            style={{ 
              backgroundColor: `${getEstadoColor()}15`,
              color: getEstadoColor(),
              fontWeight: '600',
              border: `1px solid ${getEstadoColor()}30`
            }}
          >
            {concurso.estado}
          </span>
        </div>

        {/* Descrição */}
        <p className="card-text text-muted mb-4" style={{ minHeight: '48px' }}>
          {concurso.descricao.length > 100 
            ? `${concurso.descricao.substring(0, 100)}...` 
            : concurso.descricao}
        </p>

        {/* Informações do concurso */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <div className="small text-muted">Tipo de concurso</div>
            <div className="fw-medium">{concurso.tipoConcurso}</div>
          </div>
          <div className="col-6">
            <div className="small text-muted">Valor Mínimo do voto</div>
            <div className="fw-medium" style={{ color: COLORS.primary }}>
              {concurso.valorMinimoVoto.toLocaleString('pt-BR')} MT
            </div>
          </div>
        </div>

        {/* Datas */}
        <div className="border-top pt-3">
          <div className="row g-2">
            <div className="col-6">
              <div className="small text-muted">Início</div>
              <div className="fw-medium">{formatDate(concurso.dataInicioVotacao)}</div>
            </div>
            <div className="col-6">
              <div className="small text-muted">Fim</div>
              <div className="fw-medium">{formatDate(concurso.dataFimVotacao)}</div>
            </div>
          </div>
        </div>

        {/* Mensagens de feedback */}
        {showError && error && (
          <div 
            className="alert alert-danger mt-3 py-2"
            role="alert"
            onClick={(e) => { e.stopPropagation(); setShowError(false); clear(); }}
            style={{ 
              backgroundColor: `${COLORS.error}15`,
              borderColor: COLORS.error,
              color: COLORS.error,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error.message}
          </div>
        )}

        {showSuccess && success && (
          <div 
            className="alert alert-success mt-3 py-2"
            role="alert"
            onClick={(e) => { e.stopPropagation(); setShowSuccess(false); }}
            style={{ 
              backgroundColor: `${COLORS.success}15`,
              borderColor: COLORS.success,
              color: COLORS.success,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <i className="bi bi-check-circle me-2"></i>
            {success.mensagem}
          </div>
        )}

        {/* Botões de ação */}
        <div className="mt-4">
          {/* Botão Abrir Inscrições (só aparece se PENDENTE) */}
          {isPendente ? (
            <div className="d-flex flex-column gap-2">
              <button 
                className="btn w-100"
                onClick={handleAbrirInscricoes}
                disabled={isLoading}
                style={{ 
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  padding: '0.75rem'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Abrindo...
                  </>
                ) : (
                  <>
                    <i className="bi bi-unlock me-2"></i>
                    Abrir Inscrições
                  </>
                )}
              </button>
              
              <button 
                className="btn w-100"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/entidade/concursos/${concurso.id}`);
                }}
                disabled={isLoading}
                style={{ 
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  padding: '0.75rem'
                }}
              >
                <i className="bi bi-eye me-2"></i>
                Pré-visualizar
              </button>
            </div>
          ) : (
            /* Botão Ver Inscrições (para concursos ABERTOS ou ENCERRADOS) */
            <button 
              className="btn w-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/entidade/concursos/${concurso.id}`);
              }}
              style={{ 
                backgroundColor: isAberto ? COLORS.success : COLORS.primary,
                color: 'white',
                border: 'none',
                fontWeight: '600',
                padding: '0.75rem'
              }}
            >
              <i className="bi bi-people-fill me-2"></i>
              {isAberto ? 'Gerenciar Inscrições' : 'Ver Detalhes'}
            </button>
          )}
        </div>

        {/* Informações adicionais para concursos pendentes */}
        {isPendente && (
          <div className="mt-3 pt-3 border-top">
            <div 
              className="d-flex align-items-center p-2 rounded"
              style={{ 
                backgroundColor: `${COLORS.warning}10`,
                border: `1px solid ${COLORS.warning}30`
              }}
            >
              <i className="bi bi-info-circle me-2" style={{ color: COLORS.warning }}></i>
              <small className="text-muted">
                Clique em <strong>"Abrir Inscrições"</strong> para tornar este concurso público.
              </small>
            </div>
          </div>
        )}

        {/* Informações para concursos abertos */}
        {isAberto && (
          <div className="mt-3 pt-3 border-top">
            <div 
              className="d-flex align-items-center p-2 rounded"
              style={{ 
                backgroundColor: `${COLORS.success}10`,
                border: `1px solid ${COLORS.success}30`
              }}
            >
              <i className="bi bi-check-circle me-2" style={{ color: COLORS.success }}></i>
              <small className="text-muted">
                Inscrições abertas! <strong>{concurso.nome}</strong> está visível publicamente.
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}