"use client"

import { Button } from './ui/button'
import { GoogleIcon } from './icons'
import Link from 'next/link'
import { awsClientId, awsCognitoBaseUrl } from '@/env'

export const GoogleLoginButton = () => {

  const URL = `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&identity_provider=Google`

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full">
        <GoogleIcon className="size-5" />
        Login with Google
      </Button>
    </Link>
  )
}
