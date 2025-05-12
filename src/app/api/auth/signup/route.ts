import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognito, getSecretHash } from "@/lib/cognito"
import { NextRequest, NextResponse } from "next/server"
import { awsClientSecret } from "@/env"
import { awsClientId} from "@/public-env"


export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    try {
        const command = new SignUpCommand({
            ClientId: awsClientId, // Cognito App Client ID
            Username: email, // Use a unique identifier instead of email
            Password: password,
            
            SecretHash: getSecretHash(email, awsClientId, awsClientSecret),
            UserAttributes: [
                {
                    Name: "email",
                    Value: email,
                },
                {
                    Name: "name",
                    Value: email.split('@')[0],
                },
            ],
        })

        const response = await cognito.send(command)
        console.log(response)

        return NextResponse.json({
            message: "Signup success", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
