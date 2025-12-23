// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar token de autenticação
  const accessToken = request.cookies.get('clienteToken')?.value || 
                     request.cookies.get('adminToken')?.value;

  // Rotas públicas
  if (pathname.startsWith('/auth') || pathname === '/') {
    return NextResponse.next();
  }

  // Se não tiver token, redirecionar para login
  if (!accessToken) {
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Tentar obter informações do usuário do token (simplificado)
  // Em produção, você pode decodificar o JWT para obter as roles
  const isEntidade = pathname.startsWith('/entidade');
  const isConcorrente = pathname.startsWith('/concorrente');

  // Redirecionamento baseado na rota acessada
  if (isEntidade) {
    // Verificar se tem role ENTIDADE no token
    // Aqui você precisaria decodificar o JWT
    return NextResponse.next();
  }

  if (isConcorrente) {
    // Verificar se tem role CONCORRENTE no token
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};