import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.html$|.*\\.mp3$|.*\\.css$|.*\\.js$|.*\\.jpg$|.*\\.jpeg$|.*\\.png$|.*\\.gif$|.*\\.svg$).*)',
    '/(api|trpc)(.*)',
  ],
};
