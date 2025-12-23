// hooks/admin/useAdminProfile.ts
import { useState, useCallback } from 'react';
import { AdminProfileDTO, UpdateAdminProfileDTO } from '@/types/auth/profile';
import { profileService } from '@/services/auth/getProfile';

interface UseAdminProfileReturn {
  profile: AdminProfileDTO | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (profileData: UpdateAdminProfileDTO) => Promise<void>;
  uploadPhoto: (file: File) => Promise<void>;
  clearError: () => void;
}

export const useAdminProfile = (): UseAdminProfileReturn => {
  const [profile, setProfile] = useState<AdminProfileDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar perfil');
      console.error('Erro ao buscar perfil:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileData: UpdateAdminProfileDTO): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      setProfile(updatedProfile);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadPhoto = useCallback(async (file: File): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { fotoPerfil } = await profileService.uploadProfilePhoto(file);
      setProfile(prev => prev ? { ...prev, fotoPerfil } : null);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload da foto');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    uploadPhoto,
    clearError
  };
};