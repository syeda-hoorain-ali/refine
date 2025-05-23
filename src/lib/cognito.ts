import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import crypto from "crypto"

export const cognito = new CognitoIdentityProviderClient({
  region: "us-east-1",
})

export const cognitoIdentityClient = new CognitoIdentityClient({ region: 'us-east-1' })

export const getSecretHash = (username: string, clientId: string, clientSecret: string) => {
  return crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId)
      .digest("base64")
}
