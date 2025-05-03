"use client"

import { useUser } from "@/context/UserContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOutIcon, LogInIcon, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const AuthButtons = () => {

  const { loading, user, setUser } = useUser()
  const router = useRouter()
  console.log(user)

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.replace("/")
  }

  if (loading) return null;

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Link href="/dashboard">
            <Button variant="ghost">
              <UserIcon className="text-current stroke-2 mr-1" />
              <span className="hover:underline underline-offset-2">Dashboard</span>
            </Button>
          </Link>
          <Button variant="ghost" onClick={logout}>
            <LogOutIcon className="text-current stroke-2 mr-1" />
            <span className="hover:underline underline-offset-2">Logout</span>
          </Button>
        </>
      ) : (
        <>
          <Link href="/auth/login">
            <Button variant="ghost">
              <LogInIcon className="text-current stroke-2 mr-1" />
              <span className="hover:underline underline-offset-2">Login</span>
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button variant="ghost">
              <UserIcon className="text-current stroke-2 mr-1" />
              <span className="hover:underline underline-offset-2">Signup</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

export default AuthButtons
