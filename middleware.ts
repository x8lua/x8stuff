import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

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
  '/not-approved(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return;
  }

  if (isProtectedRoute(request)) {
    await auth.protect({ unauthenticatedUrl: '/not-approved' });
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
