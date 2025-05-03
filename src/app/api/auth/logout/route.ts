import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" })

  response.cookies.set("idToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // Expire immediately
    path: "/",
  })

  return response
}
