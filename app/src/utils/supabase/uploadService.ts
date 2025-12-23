// utils/supabase/uploadService.ts
import { supabase } from '@/lib/supabase/client';

export interface UploadResult {
  url: string | null;
  error: string | null;
  publicUrl: string | null;
}

export const uploadToSupabase = async (
  file: File,
  bucket: string = 'fotos',
  folder: string = 'uploads'
): Promise<UploadResult> => {
  try {
    // Gera um nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // Faz o upload
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Erro no upload:', error);
      return { url: null, error: error.message, publicUrl: null };
    }

    // Obtém a URL pública
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return {
      url: data.path,
      error: null,
      publicUrl: publicUrlData.publicUrl
    };
  } catch (error: any) {
    console.error('Erro no upload:', error);
    return { url: null, error: error.message || 'Erro desconhecido', publicUrl: null };
  }
};

// Função para validar tamanho e tipo de arquivo
export const validateImageFile = (file: File): { valid: boolean; message?: string } => {
  // Tipos permitidos
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message: 'Arquivo muito grande. Tamanho máximo: 5MB.'
    };
  }

  return { valid: true };
};