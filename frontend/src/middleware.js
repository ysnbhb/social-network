import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = new URL(request.url);
 
  const isLoggedIn = request.cookies.get('session_id') !== undefined;

   if (isLoggedIn && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

   if (!isLoggedIn && url.pathname!="/login" ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  return NextResponse.next();
}

 export const config = {
  matcher: ['/login', '/home', '/profile'], // Apply middleware to these routes
};