"use client"

import { signupSchema } from "@/schema/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { SignUpAPIResponse } from "@/types/api-response"
import { useRouter } from "next/navigation"


const SignUpForm = () => {

  type FormType = z.infer<typeof signupSchema>

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<SignUpAPIResponse>("/api/auth/signup", data)

      console.log(response.data)
      toast.success("Sign up successfully!")
      localStorage.setItem("pendingEmail", data.email)
      localStorage.setItem("pendingPassword", data.password)


      router.push(`/auth/verify?email=${data.email}`)

    } catch (error) {
      console.log(error)
      const err = error as AxiosError<SignUpAPIResponse>
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
            <FormItem>
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


        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ?
            <><Loader2Icon className="animate-spin" /> Loading </> :
            "Sign up"
          }
        </Button>

      </form>
    </Form>
  </>)
}

export default SignUpForm
