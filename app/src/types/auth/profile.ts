
export interface UserRoleInfoDTO {
  id: number;
  roleId: number;
  name: string;
}

export interface AdminProfileDTO {
  uid: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  fotoPerfil: string;
  createdAt: string;
  rolesInfo: UserRoleInfoDTO[];
  roles: string[];
  isActive: boolean;
}

export interface UpdateAdminProfileDTO {
  nome?: string;
  telefone?: string;
  endereco?: string;
  fotoPerfil?: string;
}