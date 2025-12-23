// app/login/page.tsx
'use client';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginHero } from '@/components/auth/LoginHero';
import '@/styles/auth/auth-common.css';
import '@/styles/auth/login.css';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 min-vh-100">
          {/* Form Section - Centralizado em telas maiores */}
          <div className="col-12 col-xl-6">
            <div className="login-form-container d-flex align-items-center justify-content-center">
              <div className="w-100" style={{ maxWidth: '450px' }}>
                <AuthHeader 
                  title="Foodnect"
                />
                <LoginForm />
                
                <div className="text-center mt-4 pt-3">
                  <p className="text-muted small mb-0">
                    © 2024 Vibevote. Todos os direitos reservados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="col-xl-6 d-none d-xl-block">
            <LoginHero />
          </div>
        </div>
      </div>
    </div>
  );
}