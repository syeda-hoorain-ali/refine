"use server";

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const getUserFromToken = async () => {
  const cookie = await cookies()
  const token = cookie.get("idToken")?.value
  if (!token) return null

  try {
    const payload = jwt.decode(token) as {
      email: string
      sub: string
      [key: string]: any
    }

    return payload
  } catch {
    return null
  }
}
