"use client"

import { Button } from './ui/button'
import { GitHubIcon, GoogleIcon, MicrosoftIcon, TwitterIcon } from './icons'
import Link from 'next/link'
import { awsClientId, awsCognitoBaseUrl } from '@/public-env'

const url = (provider: string, redirectUri?: string) => {

  if (redirectUri) {
    return `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&identity_provider=${provider}&scope=openid+email+profile&redirect_uri=${redirectUri}`;
  }
  
  return `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&identity_provider=${provider}&scope=openid+email+profile`;

  // return `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&redirect_uri=${encodeURIComponent(`${baseURL}/api/auth/callbacck/${path}`)}&identity_provider=${provider}&scope=openid+email+profile${extra}`
}


export const GoogleLoginButton = () => {

  const URL = url("Google")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full rounded-md">
        <GoogleIcon className="size-5" />
        Login with Google
      </Button>
    </Link>
  )
}

export const TwitterLoginButton = () => {

  const URL = url("TwitterIdp")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full rounded-md">
        <TwitterIcon className="size-5" />
        Login with Twitter
      </Button>
    </Link>
  )
}

export const GitHubLoginButton = () => {

  const URL = url("GitHubIdp")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full rounded-md">
        <GitHubIcon className="size-5" />
        Login with GitHub
      </Button>
    </Link>
  )
}

export const MicrosoftLoginButton = () => {

  // `${baseURL}/api/auth/callback/microsoft`
  const URL = url("MicrosoftIdpN")  // N microsoft client
  // const URL = url("MicrosoftIdp", "microsoft") // My microsoft client

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full rounded-md">
        <MicrosoftIcon className="size-5" />
        Login with Microsoft
      </Button>
    </Link>
  )
}
