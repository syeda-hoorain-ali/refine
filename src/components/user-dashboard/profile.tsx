"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, signOut } from "aws-amplify/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import ProfileForm from "../forms/dashboard/profile"
import { MsalProvider } from "@azure/msal-react"
import { getToken } from "@/lib/msal"
import { azureClientId } from "@/public-env"
import { PublicClientApplication } from "@azure/msal-browser"

const Profile = () => {


  const [user, setUser] = useState<{ username: string } | null>({ username: "hoorain" })
  const [loading, setLoading] = useState(false) // true
  const router = useRouter()
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)

  useEffect(() => {
    const msalConfig = {
      auth: {
        clientId: azureClientId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
      },
      cache: { cacheLocation: "localStorage" },
    };

    const msalInstance = new PublicClientApplication(msalConfig);
    setMsalInstance(msalInstance)
  }, [])

  if (loading || !msalInstance) {
    return (
      <div className="space-y-4 max-w-md mx-auto bg-white rounded-lg px-6 py-3">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    )
  }

  return (<>
    <div className="space-y-8 max-w-md mx-auto bg-white rounded-lg px-6 py-3">
      <MsalProvider instance={msalInstance}>
        <ProfileForm />
      </MsalProvider>
    </div>

  </>)
}

export default Profile
