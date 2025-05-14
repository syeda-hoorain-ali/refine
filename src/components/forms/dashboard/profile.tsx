"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from "@/context/UserContext"
import { profileSchema } from "@/schema/user-dashboard/profileSchema"
import { Separator } from "@/components/ui/separator"
// import { isGraphPhotoUrl } from "@/lib/utils"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import AvatarUploader from "../avatar-uploader"
import { UpdateProfileAPIResponse } from "@/types/api-response"
import { toast } from "react-toastify"


const ProfileForm = () => {

  type FormType = z.infer<typeof profileSchema>

  const { user, fetchUser, loading } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [imageUrl, setImageUrl] = useState<string | null>(null)

  // const { instance } = useMsal();
  console.log(user)

  // useEffect(() => {
    // const fetchImage = async () => {
    //   if (!user?.picture) return;
    //   setImageUrl(user.picture);


    //   if (!isGraphPhotoUrl(user.picture)) return;

    //   try {


    //     // const refreshToken = await getIdToken()
    //     // if (!refreshToken) {
    //     //   console.log('refresh token not found')
    //     //   return
    //     // }
    //     // console.log("refresh token")
    //     // const token = await getAccessToken(refreshToken)
    //     // // const token = await getAccessToken()

    //     // const objectUrl = await getImageUrl(user.picture, token)
    //     // setImageUrl(objectUrl);
    //     // console.log(objectUrl)

    //     const a = await axios.get("/api/auth/graph")

    //     console.log(a)


    //   } catch (err) {
    //     console.error(err);
    //     setImageUrl(null);
    //   }
    // };

    // fetchImage();
  // }, [instance, user]);


  useEffect(() => {
    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);


  // useEffect(() => {
  //   const fetch = async () => {
  //     console.log("Fetching user...")
  //     await fetchUser()
  //     console.log("User fetched...")

  //     const token = await getToken()
  //     const imageUrl = await getImageUrl(user?.picture, token)
  //     setImageUrl(imageUrl)
  //     console.log("image", imageUrl)
  //   }

  //   fetch()
  //   console.log(user)
  // }, [])


  const form = useForm<FormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    },
  })


  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<UpdateProfileAPIResponse>("/api/auth/update-profile", { name: data.name })
      console.log(response.data)
      toast.success("Profile updated successfully!")
      await fetchUser()
      console.log(data)

    } catch (error) {
      console.log(error)
      const err = error as AxiosError<UpdateProfileAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)

    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (user && !loading) {
      form.setValue("name", user.name || "Unknown user")
      form.setValue("email", user.email)
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;


  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


        {/* Avatar */}
        <div className="flex items-center gap-4">
          {/* <Avatar className="size-20">
            <AvatarImage src="https://avatars.githubusercontent.com/u/156098367" />
            {/* <AvatarImage src={imageUrl || undefined} /> *}
            <AvatarFallback className="bg-primary text-3xl font-bold">
              {user?.name[0].toUpperCase()}
              </AvatarFallback>
          </Avatar>

          <div>
            <Label className="mb-2" htmlFor="profilePic">Profile Picture URL</Label>
            <Input id="profilePic" placeholder="https://example.com/avatar.png" />
          </div> */}

          <AvatarUploader
            fallback='U'
            // fallback={user?.name[0].toUpperCase() || 'U'}
            src={user?.picture || "https://avatars.githubusercontent.com/u/156098367"}
          />

        </div>

        <Separator />

        {/* Name & Email */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Password Section */}
        {/* <div className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
        </div>

        <Separator /> */}


        {/* Save Button */}
        <div className="flex gap-4 justify-end">
          <Link href="/auth/reset-password">
            <Button variant="outline">Reset Password</Button>
          </Link>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ?
              <><Loader2Icon className="animate-spin" /> Saving </> :
              "Save"
            }
          </Button>

          {/* <Button
            variant="outline"
            onClick={async () => {
              await signOut()
              router.replace("/login")
            }}>
            Logout
          </Button> */}
        </div>

      </form>
    </Form>
  </>)
}

export default ProfileForm
