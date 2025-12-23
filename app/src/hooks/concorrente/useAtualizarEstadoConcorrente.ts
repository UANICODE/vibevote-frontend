// hooks/concorrente/useAtualizarEstadoConcorrente.ts
'use client';

import { useState } from 'react';
import { atualizarEstadoConcorrente } from '../../services/concorrente/atualizarEstadoConcorrente';

interface UseAtualizarEstadoConcorrenteReturn {
  atualizarEstado: (concursoId: number, concorrenteId: string, estado: 'APROVADO' | 'REJEITADO') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useAtualizarEstadoConcorrente = (): UseAtualizarEstadoConcorrenteReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const atualizarEstado = async (
    concursoId: number, 
    concorrenteId: string, 
    estado: 'APROVADO' | 'REJEITADO'
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await atualizarEstadoConcorrente(concursoId, concorrenteId, { estado });
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar estado');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    atualizarEstado,
    isLoading,
    error,
  };
};