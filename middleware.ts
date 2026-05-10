import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/CL(.*)',
  '/PPT(.*)',
  '/api(.*)',
  '/application(.*)',
  '/bday(.*)',
  '/eclass(.*)',
  '/ex(.*)',
  '/logs(.*)',
  '/pics(.*)',
  '/sentinel(.*)',
  '/sentinel2(.*)',
  '/shit(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/index.html',
  '/short.html',
  '/nope.html',
  '/not-approved(.*)',
  '/favicon.ico',
]);

function getAllowedUserIds() {
  return (process.env.ALLOWED_CLERK_USER_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return;
  }

  if (isProtectedRoute(request)) {
    const { userId } = await auth.protect();
    const allowedUserIds = getAllowedUserIds();

    if (allowedUserIds.length === 0 || !allowedUserIds.includes(userId || '')) {
      const url = request.nextUrl.clone();
      url.pathname = '/nope.html';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
