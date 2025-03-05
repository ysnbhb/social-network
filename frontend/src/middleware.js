import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = new URL(request.url);

  // Check if the user is logged in  
  const isLoggedIn = request.cookies.get('session_id') !== undefined;

  // If the user is logged in and tries to access /login, redirect them to /home
  if (isLoggedIn && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // If the user is not logged in and tries to access protected routes, redirect them to /login
  if (!isLoggedIn  && (url.pathname !== '/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  return NextResponse.next();
}

// Define paths where middleware should apply
export const config = {
  matcher: ['/login', '/home', '/profile'], // Apply middleware to these routes
};