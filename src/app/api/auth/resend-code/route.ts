import { awsClientId, awsClientSecret } from "@/env"
import { cognito, getSecretHash } from "@/lib/cognito"
import { ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    try {
        const command = new ResendConfirmationCodeCommand({
            ClientId: awsClientId,
            Username: email,
            SecretHash: getSecretHash(email, awsClientId, awsClientSecret),
        })
        
        const response = await cognito.send(command)
        console.log(response)

        return NextResponse.json({
            message: "Verification code send", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
