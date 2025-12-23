// components/auth/LoginHero.tsx
import { COLORS } from '@/constants/colors';

export const LoginHero: React.FC = () => {


  return (
    <div 
      className="position-relative h-100 min-vh-100 d-flex align-items-center justify-content-center text-white p-5"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primary}E6 100%)`
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-10" />
      
      <div className="position-relative text-center" style={{ maxWidth: '500px' }}>
        <h1 className="display-5 fw-bold mb-4">
       <span style={{ color: COLORS.primary }}>Bem-vindo!</span>
        </h1>
 
       

        <div className="mt-5 pt-4 border-top border-white border-opacity-25">
          <p className="small opacity-75 mb-0">
            Sistema seguro e otimizado para gestão administrativa
          </p>
        </div>
      </div>
    </div>
  );
};