export const awsClientSecret = assertValue(
  process.env.AWS_USER_POOL_CLIENT_SECRET,
  'Missing environment variable: AWS_USER_POOL_CLIENT_SECRET'
)


export const azureClientSecret = assertValue(
  process.env.AZURE_CLIENT_SECRET,
  'Missing environment variable: AZURE_CLIENT_SECRET'
)

export const azureTenantId = assertValue(
  process.env.AZURE_TENANT_ID,
  'Missing environment variable: AZURE_TENANT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
