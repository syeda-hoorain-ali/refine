import { NextRequest, NextResponse } from "next/server"

const AUTH_PATHS = ["/auth/login", "/auth/sign-up", "/auth/verify"]
const PROTECTED_PATHS = ["/dashboard"]

export function middleware(request: NextRequest) {
    const token = request.cookies.get("idToken")?.value || null
    console.log(token ? "Middleware token" : "null")
    const pathname = request.nextUrl.pathname

    const isAuthPage = AUTH_PATHS.some(path => pathname.startsWith(path))
    const isProtectedPage = PROTECTED_PATHS.some(path => pathname.startsWith(path))


    // Redirect logged-in users AWAY from auth pages
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // User is NOT authenticated
    if (isProtectedPage && !token) {
        return NextResponse.redirect( new URL("/auth/login", request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/auth/login", "/auth/sign-up", "/auth/verify", "/dashboard"],
}
