import { NextRequest, NextResponse } from "next/server"
import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognito, getSecretHash } from "@/lib/cognito"
import { awsClientId, awsClientSecret } from "@/env"

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        const command = new ForgotPasswordCommand({
            ClientId: awsClientId,
            Username: email.split('@')[0],
            // SecretHash: getSecretHash(email, awsClientId, awsClientSecret),
        })

        const response = await cognito.send(command)
        console.log(response)

        return NextResponse.json({
            message: "Code sent successfully", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message || "Failed to send code"
        }, { status: 500 })
    }
}
