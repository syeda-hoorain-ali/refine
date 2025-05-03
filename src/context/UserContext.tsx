"use client"

import { getUserFromToken } from "@/lib/getUserFromToken"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

type User = {
  email: string
  sub: string
  [key: string]: any
}

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => { },
  fetchUser: async () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    const userData = await getUserFromToken()
    setUser(userData)
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [getUserFromToken])

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}
