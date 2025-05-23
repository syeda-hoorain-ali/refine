"use client"

import { loginSchema } from "@/schema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import Link from "next/link"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginAPIResponse } from "@/types/api-response"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"


const LoginForm = () => {

  type FormType = z.infer<typeof loginSchema>

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { fetchUser } = useUser()

  const form = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<LoginAPIResponse>("/api/auth/login", data)
      console.log(response.data)
      toast.success("Login successfully!")
      await fetchUser()
      router.replace("/")

    } catch (error) {
      console.log(error)
      const err = error as AxiosError<LoginAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)

    } finally {
      setIsSubmitting(false)
    }
  }


  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="absolute right-2 bottom-2 size-5"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ?
                      <EyeOffIcon className="size-5" /> :
                      <EyeIcon className="size-5" />
                    }
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link href="/auth/reset-password" className="text-sm font-semibold ml-1 mb-4 inline-block">
          Forgot your password?
        </Link>


        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ?
            <><Loader2Icon className="animate-spin" /> Loading </> :
            "Login"
          }
        </Button>

      </form>
    </Form>
  </>)
}

export default LoginForm
