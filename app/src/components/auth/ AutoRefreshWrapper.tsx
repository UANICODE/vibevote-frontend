// src/components/auth/AutoRefreshWrapper.tsx
'use client';

import React from 'react';
import { useAutoRefresh } from '@/hooks/auth/useAutoRefresh';

export const AutoRefreshWrapper = ({ children }: { children: React.ReactNode }) => {
  useAutoRefresh();
  return <>{children}</>;
};
