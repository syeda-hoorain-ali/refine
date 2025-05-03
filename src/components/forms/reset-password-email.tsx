"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ForgotPasswordAPIResponse } from "@/types/api-response"
import { emailSchema } from "@/schema/emailSchema"
import ResetPasswordForm from "./reset-password"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const ResetPasswordEmailForm = () => {
  type FormType = z.infer<typeof emailSchema>
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<FormType>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ForgotPasswordAPIResponse>("/api/auth/forgot-password", data)
      console.log(response)
      toast.success("Reset code sent to your email")
      setDialogOpen(true) // Open dialog when code sent

    } catch (error) {
      const err = error as AxiosError<ForgotPasswordAPIResponse>
      const message = err.response?.data.error || err.message
      toast.error(message)
    
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2Icon className="animate-spin" /> Sending</>
            ) : "Send Reset Code"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Your Password</AlertDialogTitle>
          </AlertDialogHeader>

          <ResetPasswordForm email={form.getValues("email")} />

          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ResetPasswordEmailForm
2