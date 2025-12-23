'use client';

import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: number;        // controla o tamanho base
  scale?: number;       // controla o zoom
  className?: string;   // permite classes extras
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({
  size = 60,
  scale = 1,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`d-inline-flex align-items-center justify-content-center ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        transition: 'transform 0.3s ease',
        ...style,
      }}
    >
      <Image
        src="https://pktlucrbkljicperffne.supabase.co/storage/v1/object/public/imagens/logo_sem_fundo.png"
        alt="Logo"
        width={size}
        height={size}
        unoptimized // mantém a qualidade original
        style={{
          borderRadius: '8px',
          objectFit: 'contain',
        }}
        priority
      />
    </div>
  );
};
