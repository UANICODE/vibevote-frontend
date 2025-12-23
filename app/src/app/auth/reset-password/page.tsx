// app/reset-password/page.tsx
import { Suspense } from 'react';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.tsx';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
