"use client"

import { getUserFromToken } from "@/lib/getUserFromToken"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"

type User = {
  email: string
  sub: string
  name: string;
  picture: string;
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
    setLoading(true)
    const userData = await getUserFromToken()
    setUser(userData)
    // console.log("user data", userData)
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
