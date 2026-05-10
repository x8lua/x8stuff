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
  '/not-approved(.*)',
  '/favicon.ico',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(request)) {
    await auth.protect({ unauthenticatedUrl: '/not-approved' });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
