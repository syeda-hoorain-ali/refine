import { NextRequest, NextResponse } from "next/server"

const AUTH_PATHS = ["/auth/login", "/auth/sign-up", "/auth/verify"]
const PROTECTED_PATHS = ["/dashboard", "/auth/logout"]

export function middleware(request: NextRequest) {
    const token = request.cookies.get("idToken")?.value || null
    const pathname = request.nextUrl.pathname

    const isAuthPage = AUTH_PATHS.some(path => pathname.startsWith(path))
    const isProtectedPage = PROTECTED_PATHS.some(path => pathname.startsWith(path))


    // Redirect logged-in users AWAY from auth pages
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // User is NOT authenticated
    if (isProtectedPage && !token) {
        const loginUrl = new URL("/login", request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/auth/login", "/auth/sign-up", "/auth/verify", "/dashboard", "/auth/logout"],
}
