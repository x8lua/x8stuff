import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_PREFIXES = [
  '/CL',
  '/PPT',
  '/api',
  '/application',
  '/bday',
  '/eclass',
  '/ex',
  '/logs',
  '/pics',
  '/sentinel',
  '/sentinel2',
  '/shit',
];

const PUBLIC_PATHS = new Set(['/', '/index.html', '/short.html', '/not-approved']);

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith('/_next/')) return true;
  if (pathname === '/favicon.ico') return true;
  if (pathname.startsWith('/api/login')) return true;
  return false;
}

function isPrivatePath(pathname: string) {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname) || !isPrivatePath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('x8_auth_token')?.value;
  const expectedToken = process.env.X8_AUTH_TOKEN;

  if (expectedToken && token === expectedToken) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/not-approved';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
