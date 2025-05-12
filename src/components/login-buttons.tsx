"use client"

import { Button } from './ui/button'
import { GitHubIcon, GoogleIcon, MicrosoftIcon, TwitterIcon } from './icons'
import Link from 'next/link'
import { awsClientId, awsCognitoBaseUrl, baseURL } from '@/public-env'

const url = (provider: string, path: string, extra: string = '') => {
  return `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&redirect_uri=${baseURL}/api/auth/callback/${path}&identity_provider=${provider}&scope=openid+email+profile${extra}`;


  // return `${awsCognitoBaseUrl}/oauth2/authorize?response_type=code&client_id=${awsClientId}&redirect_uri=${encodeURIComponent(`${baseURL}/api/auth/callbacck/${path}`)}&identity_provider=${provider}&scope=openid+email+profile${extra}`
}

console.log(encodeURIComponent(`${baseURL}/api/auth/callback/`))

const githubUrl = `https://hoorain.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${awsClientId}&redirect_uri=http://localhost:3000/api/auth/callback/github&identity_provider=GitHubIdp`

export const GoogleLoginButton = () => {

  const URL = url("Google", "google")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full">
        <GoogleIcon className="size-5" />
        Login with Google
      </Button>
    </Link>
  )
}

export const TwitterLoginButton = () => {

  const URL = url("TwitterIdp", "twitter", "&prompt=none")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full">
        <TwitterIcon className="size-5" />
        Login with Twitter
      </Button>
    </Link>
  )
}

export const GitHubLoginButton = () => {

  const URL = url("GitHubIdp", "github")

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full">
        <GitHubIcon className="size-5" />
        Login with GitHub
      </Button>
    </Link>
  )
}

export const MicrosoftLoginButton = () => {

  const URL = url("MicrosoftIdpNibra", "microsoft")  // Nibras microsoft client
  // const URL = url("MicrosoftIdp", "microsoft")         // Hoorain microsoft client

  return (
    <Link href={URL}>
      <Button variant="outline" className="w-full">
        <MicrosoftIcon className="size-5" />
        Login with Microsoft
      </Button>
    </Link>
  )
}
