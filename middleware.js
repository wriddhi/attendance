import { NextResponse } from 'next/server'


export function middleware(request) {
  
  const session = request.cookies['_parsed'].get('next-auth.session-token')

  if(!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}