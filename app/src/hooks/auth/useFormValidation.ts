// hooks/auth/useFormValidation.ts
import { useState, useCallback } from 'react';
import { AuthValidation, ValidationResult } from '@/utils/validation/AuthValidation';
import { LoginFormFields, LoginFormData, FormErrors } from '@/types/auth/form';

interface UseFormValidationReturn {
  errors: FormErrors;
  validateField: (field: LoginFormFields, value: string) => void;
  validateForm: (data: LoginFormData) => ValidationResult;
  clearErrors: () => void;
  clearFieldError: (field: LoginFormFields) => void;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const [errors, setErrors] = useState<FormErrors>({});

const validateField = useCallback((field: LoginFormFields, value: string): void => {
  const error = AuthValidation.getFieldError(field, value);
  
  setErrors(prev => {
    const newErrors = { ...prev };
    
    if (error) newErrors[field] = error;
    else delete newErrors[field]; // ✅ remove se for válido
    
    return newErrors;
  });
}, []);


  const validateForm = useCallback((data: LoginFormData): ValidationResult => {
    const validation = AuthValidation.validateLoginForm(data.email, data.password);
    
    setErrors(validation.errors as FormErrors);
    
    return validation;
  }, []);

  const clearErrors = useCallback((): void => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: LoginFormFields): void => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError
  };
};