"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { verificationCodeSchema } from "@/schema/verificationCodeSchema"
import { ResendCodeAPIResponse, VerifyCodeAPIResponse } from "@/types/api-response"
import { useUser } from "@/context/UserContext"


const VerificationCodeForm = () => {

  type FormType = z.infer<typeof verificationCodeSchema>

  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const { fetchUser } = useUser()
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)
    const email = searchParams.get("email")
    const password = localStorage.getItem("pendingPassword")

    try {
      const response = await axios.post<VerifyCodeAPIResponse>("/api/auth/verify-code", {
        email,
        password,
        code: data.code,
      })
      console.log(response.data)
      toast.success("Verification successfull")
      await fetchUser()
      router.push("/")

    } catch (error) {
      console.log(error)
      const err = error as AxiosError<VerifyCodeAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)

    } finally {
      setIsSubmitting(false)
    }
  }


  const resendCode = async () => {
    setIsSubmitting(true)
    const email = searchParams.get("email")

    try {
      const response = await axios.post<ResendCodeAPIResponse>("/api/auth/resend-code", { email })
      console.log(response.data)
      toast.success("Verification code resent successfully")

    } catch (error) {
      console.log(error)
      const err = error as AxiosError<ResendCodeAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)

    } finally {
      setIsSubmitting(false)
    }
  }



  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">

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

        <p className="my-2 text-center text-sm text-gray-800">
          Didn&apos;t receive the code?
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800"
            type="button"
            onClick={resendCode}
          >
            Resend Code
          </Button>
        </p>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ?
            <><Loader2Icon className="animate-spin" /> Loading</> :
            "Verify"
          }
        </Button>

      </form>
    </Form>
  </>)
}

export default VerificationCodeForm
