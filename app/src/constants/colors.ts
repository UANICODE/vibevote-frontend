// lib/styles/colors.ts
export const COLORS = {
  primary: '#3B82F6',         // Azul claro moderno
  secondary: '#8B5CF6',       // Roxo que combina com azul
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',
  secondaryLight: '#A78BFA',
  secondaryDark: '#7C3AED',
  
  // Backgrounds
  backgroundLight: '#F8FAFC',
  backgroundDark: '#0F172A',
  surfaceLight: '#FFFFFF',
  surfaceDark: '#1E293B',
  
  // Text
  textPrimaryLight: '#0F172A',
  textPrimaryDark: '#F1F5F9',
  textSecondaryLight: '#475569',
  textSecondaryDark: '#94A3B8',
  textMutedLight: '#64748B',
  textMutedDark: '#64748B',
  
  // Borders
  borderLight: '#E2E8F0',
  borderDark: '#334155',
  dividerLight: '#CBD5E1',
  dividerDark: '#475569',
  
  // Estados
  success: '#10B981',
  successLight: '#34D399',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  error: '#EF4444',
  errorLight: '#F87171',
  info: '#3B82F6',
  infoLight: '#60A5FA',
  
  // Utilitários
  backgroundSkeleton: '#E2E8F0',
  backdropOverlay: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
  
  // Gradientes
  gradientPrimary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  gradientSecondary: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
} as const;

export type ColorTheme = typeof COLORS;