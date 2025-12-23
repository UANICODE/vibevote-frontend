// types/form.ts
export type LoginFormFields = 'email' | 'password';

export interface LoginFormData {
  email: string;
  password: string;
}

export type FormErrors = Partial<Record<LoginFormFields, string>>;
export type FormTouched = Partial<Record<LoginFormFields, boolean>>;