import { NextRequest, NextResponse } from "next/server"
import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognito, getSecretHash } from "@/lib/cognito"
import { awsClientSecret } from "@/env"
import { awsClientId } from "@/public-env"


export async function POST(req: NextRequest) {
    try {
        const { email, code, newPassword } = await req.json()

        const command = new ConfirmForgotPasswordCommand({
            ClientId: awsClientId,
            Username: email,
            ConfirmationCode: code,
            Password: newPassword,
            SecretHash: getSecretHash(email, awsClientId, awsClientSecret),
        })

        const response = await cognito.send(command)
        console.log(response)

        return NextResponse.json({
            message: "Password reset successfully", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message  || "Password reset failed"
        }, { status: 500 })
    }
}
