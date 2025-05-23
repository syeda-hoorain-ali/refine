export const awsClientId = assertValue(
  process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
  'Missing environment variable: NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID'
)

export const awsCognitoBaseUrl = assertValue(
  process.env.NEXT_PUBLIC_AWS_BASE_URL,
  'Missing environment variable: NEXT_PUBLIC_AWS_BASE_URL'
)


export const azureClientId = assertValue(
  process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
  'Missing environment variable: NEXT_PUBLIC_AZURE_CLIENT_ID'
)

export const baseURL = assertValue(
  process.env.NEXT_PUBLIC_BASE_URL,
  'Missing environment variable: NEXT_PUBLIC_BASE_URL'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
