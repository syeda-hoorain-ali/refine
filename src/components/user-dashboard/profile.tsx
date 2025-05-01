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

const Profile = () => {


  const [user, setUser] = useState<{ username: string } | null>({ username: "hoorain" })
  const [loading, setLoading] = useState(false) // true
  const router = useRouter()

  useEffect(() => {
    // getCurrentUser()
    //   .then((u) => setUser(u))
    //   .catch(() => router.replace("/login"))
    //   .finally(() => setLoading(false))
  }, [router])

  if (loading) {
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

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src="https://avatars.githubusercontent.com/u/156098367" />
          <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <Label className="mb-2" htmlFor="profilePic">Profile Picture URL</Label>
          <Input id="profilePic" placeholder="https://example.com/avatar.png" />
        </div>
      </div>

      <hr />

      {/* Name & Email */}
      <div className="space-y-4">
        <div>
          <Label className="mb-2" htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Your Name" />
        </div>
        <div>
          <Label className="mb-2" htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </div>

      <Separator />

      {/* Password Section */}
      <div className="space-y-4">
        <div>
          <Label className="mb-2" htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" />
        </div>
        <div>
          <Label className="mb-2" htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" />
        </div>
      </div>

      <Separator />

      {/* Save Button */}
      <div className="flex gap-4 justify-end">
        <Button>Save Changes</Button>


        <Button
          variant="outline"
          onClick={async () => {
            await signOut()
            router.replace("/login")
          }}
        >
          Sign out
        </Button>

      </div>
    </div>

  </>)
}

export default Profile
