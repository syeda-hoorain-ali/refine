"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import ProfileForm from "../forms/dashboard/profile"
import { MsalProvider } from "@azure/msal-react"
import { azureClientId } from "@/public-env"
import { PublicClientApplication } from "@azure/msal-browser"

const Profile = () => {


  const [loading, setLoading] = useState(true) // true
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
    setLoading(false)
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
