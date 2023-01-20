import { NextResponse } from 'next/server'

export function middleware(request) {
  const validViews = ["attendance", "new-entry", "edit-employee", "attendance-list", "upload-data", "download-data", "attendance-report", "gate-attendance"]

  const view = request.nextUrl.pathname.split



  // if ( view!="undefined" && !validViews.includes(view)) {
  //   return NextResponse.redirect(new URL('/dashboard'))
  // }
}

export const config = {
  matcher: '/dashboard/:path*',
}