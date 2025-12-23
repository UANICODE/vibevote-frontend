// components/concorrente/ConcorrenteCard.tsx
'use client';

import { ConcorrenteDTO } from '@/types/concorrente';
import { COLORS } from '@/constants/colors';
import { useAtualizarEstadoConcorrente } from '@/hooks/concorrente/useAtualizarEstadoConcorrente';
import { useState } from 'react';

interface ConcorrenteCardProps {
  concorrente: ConcorrenteDTO;
  concursoId: number;
  onEstadoAtualizado?: () => void;
}

export const ConcorrenteCard = ({ 
  concorrente, 
  concursoId, 
  onEstadoAtualizado 
}: ConcorrenteCardProps) => {
  const { atualizarEstado, isLoading } = useAtualizarEstadoConcorrente();
  const [localEstado, setLocalEstado] = useState(concorrente.estado);

  const getEstadoColor = () => {
    switch (localEstado) {
      case 'APROVADO': return COLORS.success;
      case 'REJEITADO': return COLORS.error;
      default: return COLORS.warning;
    }
  };

  const getEstadoTexto = () => {
    switch (localEstado) {
      case 'APROVADO': return 'Aprovado';
      case 'REJEITADO': return 'Rejeitado';
      default: return 'Pendente';
    }
  };

  const handleAtualizarEstado = async (novoEstado: 'APROVADO' | 'REJEITADO') => {
    try {
      await atualizarEstado(concursoId, concorrente.userId, novoEstado);
      setLocalEstado(novoEstado);
      onEstadoAtualizado?.();
    } catch (error) {
      console.error('Erro ao atualizar estado:', error);
    }
  };

  const isAprovado = localEstado === 'APROVADO';
  const isRejeitado = localEstado === 'REJEITADO';
  const isPendente = localEstado === 'PENDENTE';

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex align-items-start mb-3">
          {/* Foto de Perfil */}
          <div className="me-3">
            {concorrente.fotoPerfil ? (
              <img
                src={concorrente.fotoPerfil}
                alt={concorrente.nome}
                className="rounded-circle"
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  objectFit: 'cover',
                  border: `2px solid ${getEstadoColor()}40`
                }}
              />
            ) : (
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: COLORS.gradientSecondary,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                {concorrente.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Informações do Concorrente */}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="fw-bold mb-1" style={{ color: COLORS.textPrimaryLight }}>
                  {concorrente.nome}
                </h5>
                <p className="text-muted mb-2 small">{concorrente.email}</p>
                <p className=" mb-2 small">Contacto: {concorrente.telefone}</p>
              </div>
              
              {/* Badge de Estado */}
              <span 
                className="badge rounded-pill px-3 py-2"
                style={{ 
                  backgroundColor: `${getEstadoColor()}15`,
                  color: getEstadoColor(),
                  fontWeight: '600'
                }}
              >
                {getEstadoTexto()}
              </span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-3">
          {isPendente ? (
            <div className="d-grid gap-2">
              <button
                onClick={() => handleAtualizarEstado('APROVADO')}
                disabled={isLoading}
                className="btn btn-sm"
                style={{ 
                  backgroundColor: COLORS.success,
                  color: 'white',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                <i className="bi bi-check-circle me-2"></i>
                {isLoading ? 'Processando...' : 'Aprovar'}
              </button>
              
              <button
                onClick={() => handleAtualizarEstado('REJEITADO')}
                disabled={isLoading}
                className="btn btn-sm"
                style={{ 
                  backgroundColor: COLORS.error,
                  color: 'white',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                {isLoading ? 'Processando...' : 'Rejeitar'}
              </button>
            </div>
          ) : (
            <div className="d-grid">
              <button
                disabled
                className="btn btn-sm"
                style={{ 
                  backgroundColor: `${getEstadoColor()}20`,
                  color: getEstadoColor(),
                  border: `1px solid ${getEstadoColor()}40`,
                  fontWeight: '600',
                  cursor: 'not-allowed'
                }}
              >
                <i className={`bi ${isAprovado ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2`}></i>
                {isAprovado ? 'Aprovado' : 'Rejeitado'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};