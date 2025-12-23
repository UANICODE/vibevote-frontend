// components/public/ConcursoPublicCard.tsx
'use client';

import { ConcursoPublicoDTO } from '../../types/concurso/concursoPublico';
import { COLORS } from '@/constants/colors';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConcursoPublicCardProps {
  concurso: ConcursoPublicoDTO;
}

export function ConcursoPublicCard({ concurso }: ConcursoPublicCardProps) {
  // Função para formatar datas no formato de array [ano, mês, dia, hora, minuto, segundo]
  const formatDate = (dateData: any): string => {
    try {
      // Se for um array no formato [ano, mês, dia, hora, minuto, segundo]
      if (Array.isArray(dateData)) {
        const [
          year,
          month,
          day,
          hour = 0,
          minute = 0,
          second = 0,
        ] = dateData;

        // ⚠️ month - 1 porque JS começa no mês 0
        const date = new Date(year, month - 1, day, hour, minute, second);

        return format(
          date,
          "dd 'de' MMM 'de' yyyy • HH:mm",
          { locale: ptBR }
        );
      }
      
      // Se for uma string de data ISO
      if (typeof dateData === 'string') {
        const date = new Date(dateData);
        return format(
          date,
          "dd 'de' MMM 'de' yyyy • HH:mm",
          { locale: ptBR }
        );
      }
      
      // Se for um objeto com propriedades separadas
      if (dateData && typeof dateData === 'object') {
        const date = new Date(
          dateData.year || dateData[0],
          (dateData.month || dateData[1]) - 1,
          dateData.day || dateData[2],
          dateData.hour || dateData[3] || 0,
          dateData.minute || dateData[4] || 0,
          dateData.second || dateData[5] || 0
        );
        return format(
          date,
          "dd 'de' MMM 'de' yyyy • HH:mm",
          { locale: ptBR }
        );
      }
      
      return '-';
    } catch (error) {
      console.error('Erro ao formatar data:', error, dateData);
      return '-';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'DJ': return 'DJ Battle';
      case 'KARAOKE': return 'Karaokê';
      default: return tipo;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'DJ': return COLORS.secondary;
      case 'KARAOKE': return COLORS.warning;
      default: return COLORS.primary;
    }
  };

  const isAtivo = concurso.estado === 'ABERTO';

  // Calcular dias restantes
  const calcularDiasRestantes = (): string => {
    try {
      let fimDate: Date;
      
      if (Array.isArray(concurso.dataFimVotacao)) {
        const [year, month, day, hour = 0, minute = 0, second = 0] = concurso.dataFimVotacao;
        fimDate = new Date(year, month - 1, day, hour, minute, second);
      } else if (typeof concurso.dataFimVotacao === 'string') {
        fimDate = new Date(concurso.dataFimVotacao);
      } else if (concurso.dataFimVotacao && typeof concurso.dataFimVotacao === 'object') {
        fimDate = new Date(
          (concurso.dataFimVotacao as any).year || (concurso.dataFimVotacao as any)[0],
          ((concurso.dataFimVotacao as any).month || (concurso.dataFimVotacao as any)[1]) - 1,
          (concurso.dataFimVotacao as any).day || (concurso.dataFimVotacao as any)[2],
          (concurso.dataFimVotacao as any).hour || (concurso.dataFimVotacao as any)[3] || 0,
          (concurso.dataFimVotacao as any).minute || (concurso.dataFimVotacao as any)[4] || 0,
          (concurso.dataFimVotacao as any).second || (concurso.dataFimVotacao as any)[5] || 0
        );
      } else {
        return '-';
      }
      
      const agora = new Date();
      const diff = fimDate.getTime() - agora.getTime();
      
      if (diff <= 0) return 'Encerrado';
      
      const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
      
      if (dias === 1) return '1 dia';
      if (dias < 30) return `${dias} dias`;
      
      const meses = Math.floor(dias / 30);
      if (meses === 1) return '1 mês';
      return `${meses} meses`;
    } catch (error) {
      console.error('Erro ao calcular dias restantes:', error);
      return '-';
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm hover-lift">
      <div className="card-body p-4">
        {/* Header com tipo e estado */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span 
            className="badge rounded-pill px-3 py-2"
            style={{ 
              backgroundColor: `${getTipoColor(concurso.tipoConcurso)}15`,
              color: getTipoColor(concurso.tipoConcurso),
              fontWeight: '600'
            }}
          >
            {getTipoLabel(concurso.tipoConcurso)}
          </span>
          
          <span 
            className="badge rounded-pill px-3 py-2"
            style={{ 
              backgroundColor: isAtivo ? `${COLORS.success}15` : `${COLORS.error}15`,
              color: isAtivo ? COLORS.success : COLORS.error,
              fontWeight: '600'
            }}
          >
            {concurso.estado}
          </span>
        </div>

        {/* Nome e descrição */}
        <h3 className="h5 fw-bold mb-3" style={{ color: COLORS.textPrimaryLight }}>
          {concurso.nome}
        </h3>
        
        <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
          {concurso.descricao && concurso.descricao.length > 120 
            ? `${concurso.descricao.substring(0, 120)}...` 
            : concurso.descricao || 'Sem descrição'}
        </p>

        {/* Informações */}
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="small text-muted">Organizador</div>
            <div className="fw-medium" style={{ color: COLORS.primary }}>
              <i className="bi bi-building me-1"></i>
              {concurso.nomeEntidade || 'Não informado'}
            </div>
          </div>
          
          <div className="col-6">
            <div className="small text-muted">Data de Início das Votações dos concorentes que participarem</div>
            <div className="fw-medium">
              <i className="bi bi-calendar-event me-1"></i>
              {formatDate(concurso.dataInicioVotacao)}
            </div>
          </div>
          
          <div className="col-6">
            <div className="small text-muted">Data de Término das Votações dos concorentes que participarem</div>
            <div className="fw-medium">
              <i className="bi bi-calendar-x me-1"></i>
              {formatDate(concurso.dataFimVotacao)}
            </div>
          </div>
          
          <div className="col-6">
            <div className="small text-muted">Período Restante</div>
            <div className="fw-medium text-warning">
              <i className="bi bi-clock me-1"></i>
              {calcularDiasRestantes()}
            </div>
          </div>
        </div>

        {/* Botão de ação */}
        {isAtivo ? (
          <Link 
            href={`/inscricao/${concurso.id}`}
            className="btn w-100 d-flex align-items-center justify-content-center"
            style={{ 
              background: COLORS.gradientPrimary,
              color: 'white',
              border: 'none',
              fontWeight: '600',
              padding: '0.75rem',
              fontSize: '1rem'
            }}
          >
            <i className="bi bi-pencil-square me-2"></i>
            Quero me inscrever
          </Link>
        ) : (
          <button 
            className="btn w-100"
            disabled
            style={{ 
              backgroundColor: COLORS.borderLight,
              color: COLORS.textMutedLight,
              border: 'none',
              fontWeight: '600',
              padding: '0.75rem'
            }}
          >
            <i className="bi bi-lock me-2"></i>
            Inscrições encerradas
          </button>
        )}
      </div>
    </div>
  );
}