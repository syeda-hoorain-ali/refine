"use client"

import { signupSchema } from "@/schema/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"


const SignUpForm = () => {

  type FormType = z.infer<typeof signupSchema>

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: FormType) => {
    console.log(values)
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


        <Button type="submit" className="w-full">Sign up</Button>

      </form>
    </Form>
  </>)
}

export default SignUpForm
