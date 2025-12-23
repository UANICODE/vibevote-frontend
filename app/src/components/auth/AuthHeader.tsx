// components/auth/AuthHeader.tsx
'use client';

import Image from 'next/image';
import { COLORS } from '@/constants/colors';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => (
  <div className="text-center mb-5">
    <div className="d-flex justify-content-center mb-3">
      <div 
        className=" "
        style={{ width: '80px', height: '80px' }}
      >
        
        {/* Fallback caso a imagem não carregue */}
        <div 
          className="w-100 h-100 d-none align-items-center justify-content-center text-white fw-bold"
          style={{ 
            display: 'none', 
            backgroundColor: COLORS.primary,
            fontSize: '1.5rem'
          }}
        >
          
        </div>
      </div>
    </div>

  </div>
);