// utils/ratingUtils.ts
import { AvaliacaoResponseDTO } from '@/types/rating';

export const getRatingType = (estrelas: number): 'positivo' | 'neutro' | 'negativo' => {
  if (estrelas >= 4) return 'positivo';
  if (estrelas >= 3) return 'neutro';
  return 'negativo';
};

export const getRatingColor = (estrelas: number): string => {
  const type = getRatingType(estrelas);
  const colors = {
    positivo: 'success',
    neutro: 'warning',
    negativo: 'danger'
  };
  return colors[type];
};

export const getRatingIcon = (estrelas: number): string => {
  const type = getRatingType(estrelas);
  const icons = {
    positivo: '😊',
    neutro: '😐',
    negativo: '😞'
  };
  return icons[type];
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};