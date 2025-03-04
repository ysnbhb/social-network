import { NextResponse } from "next/server"; 
 
  export function middleware(request){
      const url = new URL(request.url);
      const isLoggedIn =request.cookies.get('session_id') !== undefined;
        
        // if (isLoggedIn && url.pathname==="/login"){
        //   if (isLoggedIn) {
        //     return NextResponse.redirect(new URL('/home', request.url));
        //   }
        // }
        

      if (isLoggedIn && ['/login'].includes(url.pathname) ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
      
  }
  export const config = {
      matcher: ['/home', '/profile'],  
    };