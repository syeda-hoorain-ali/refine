import VerificationCodeForm from "@/components/forms/verification-code-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const page = () => {
  return (
    <div className="w-screen min-h-[calc(100lvh-7.25rem)]">
      <div className="min-h-[calc(100lvh-7.25rem)] w-full flex items-center justify-center">

        <Card className="w-full mx-4 my-8 max-w-96 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Email Verification</CardTitle>
            <CardDescription>
              Please check your email for the verification code and enter it below to continue.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <VerificationCodeForm />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default page
