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
      name: string;
      picture: string;
      [key: string]: any
    }

    return payload
  } catch {
    return null
  }
}


export const getIdToken = async () => {
  const cookie = await cookies()
  const idToken = cookie.get("idToken")?.value
  return idToken
}


export const getAccessToken = async () => {
  const cookie = await cookies()
  const accessToken = cookie.get("accessToken")?.value
  return accessToken
}


export const getRefreshToken = async () => {
  const cookie = await cookies()
  const refreshToken = cookie.get("refreshToken")?.value
  return refreshToken
}

