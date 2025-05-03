"use client"

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { resetPasswordSchema } from "@/schema/resetPasswordSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResetPasswordAPIResponse } from "@/types/api-response"
import { useRouter } from "next/navigation"

type ResetPasswordFormProps = {
  email: string
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  type FormType = z.infer<typeof resetPasswordSchema>

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)

    try {
      await axios.post<ResetPasswordAPIResponse>("/api/auth/reset-password", {
        email,
        code: data.code,
        newPassword: data.password,
      })
      toast.success("Password reset successfully!")
      router.push("/auth/login")
      
    } catch (error) {
      const err = error as AxiosError<ResetPasswordAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
              <FormLabel>New Password</FormLabel>
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
                    {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2Icon className="animate-spin" /> Resetting</>
          ) : "Reset Password"}
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
