import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isApproved = req.auth?.user?.isApproved
  const isAdmin = req.auth?.user?.role === 'ADMIN'
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login')
  const isOnRegisterPage = req.nextUrl.pathname.startsWith('/register')
  const isOnPendingPage = req.nextUrl.pathname.startsWith('/pending')
  const isOnAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isOnApiAuth = req.nextUrl.pathname.startsWith('/api/auth')

  // Allow API auth routes
  if (isOnApiAuth) {
    return
  }

  if (isLoggedIn) {
    if (isOnLoginPage || isOnRegisterPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (!isApproved && !isOnPendingPage) {
      return NextResponse.redirect(new URL('/pending', req.url))
    }

    if (isApproved && isOnPendingPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (isOnAdminPage && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  } else {
    if (!isOnLoginPage && !isOnRegisterPage) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
