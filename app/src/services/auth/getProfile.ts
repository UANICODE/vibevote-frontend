// services/admin/profileService.ts
import { AdminProfileDTO, UpdateAdminProfileDTO } from '@/types/auth/profile';
import { apiClient } from '@/lib/axios';

class ProfileService {
  private readonly basePath = '/api/auth/user';

  async getProfile(): Promise<AdminProfileDTO> {
    const response = await apiClient.get<AdminProfileDTO>(`${this.basePath}/listar/user`);
    return response.data;
  }

  async updateProfile(profileData: UpdateAdminProfileDTO): Promise<AdminProfileDTO> {
    const response = await apiClient.put<AdminProfileDTO>(`${this.basePath}/listar/user`, profileData);
    return response.data;
  }

  async uploadProfilePhoto(file: File): Promise<{ fotoPerfil: string }> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await apiClient.post<{ fotoPerfil: string }>(
      `${this.basePath}/upload-foto`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}

export const profileService = new ProfileService();