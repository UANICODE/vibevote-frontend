'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { COLORS } from '@/constants/colors';


export default function NotFound() {
  const router = useRouter();


  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.backgroundLight }}>
      <div className="card shadow-lg border-0 p-5 text-center" style={{ 
        maxWidth: '500px', 
        width: '100%',
        background: COLORS.backgroundLight,
        border: `1px solid ${COLORS.borderLight}`,
        animation: 'slideUp 0.6s ease-out'
      }}>
   

        <div 
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto"
          style={{ 
            width: '120px', 
            height: '120px', 
            backgroundColor: COLORS.warning + '15',
            color: COLORS.warning,
            fontSize: '3rem',
            fontWeight: 'bold'
          }}
        >
          404
        </div>

        <h1 className="mb-3" style={{ color: COLORS.textPrimaryLight }}>
          Página Não Encontrada
        </h1>
        
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
          OPSS! Recurso solicitado não encontrado.
        </p>

      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
