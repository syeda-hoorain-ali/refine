import ResetPasswordEmailForm from "@/components/forms/reset-password-email"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const page = () => {
  return (
    <div className="w-screen min-h-[calc(100lvh-7.25rem)]">
      <div className="min-h-[calc(100lvh-7.25rem)] w-full flex items-center justify-center">

        <Card className="w-full mx-4 my-8 max-w-96 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your email below to send verification code</CardDescription>
          </CardHeader>

          <CardContent>
            <ResetPasswordEmailForm />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default page
