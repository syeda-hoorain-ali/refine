import SignUpForm from "@/components/forms/sign-up"
import { GoogleIcon } from "@/components/icons"
import AWSProvider from "@/components/layout/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-screen min-h-[calc(100lvh-7.25rem)]">
      <div className="min-h-[calc(100lvh-7.25rem)] w-full flex items-center justify-center">

        <Card className="w-full mx-4 my-8 max-w-96 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Sign up</CardTitle>
            <CardDescription>Sign up to start shopping</CardDescription>
          </CardHeader>

          <CardContent>
            <AWSProvider>
              <SignUpForm />
            </AWSProvider>

            <p className="my-2 text-center text-sm text-gray-800">
              Already have an account? {' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">Log in</Link>
            </p>


            {/* <div className="relative w-full h-px my-6 bg-gray-300 text-gray-500">
              <span className="absolute bg-background px-1 top-1/2 left-1/2 -translate-1/2 text-sm">or</span>
            </div>


            <Button variant="outline" className="w-full">
              <GoogleIcon className="size-5" />
              Sign up with Google
            </Button> */}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default page
