export const awsClientId = assertValue(
  process.env.AWS_CLIENT_ID,
  'Missing environment variable: AWS_CLIENT_ID'
)

export const awsClientSecret = assertValue(
  process.env.AWS_CLIENT_SECRET,
  'Missing environment variable: AWS_CLIENT_SECRET'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
