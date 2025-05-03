import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognito, getSecretHash } from "@/lib/cognito"
import { NextRequest, NextResponse } from "next/server"
import { awsClientId, awsClientSecret } from "@/env"
import { cookies } from "next/headers"


export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    try {
        const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: awsClientId,
            AuthParameters: {
                USERNAME: email.split('@')[0],
                PASSWORD: password,
                // SECRET_HASH: getSecretHash(email, awsClientId, awsClientSecret)
            },
        })
        const response = await cognito.send(command)
        console.log(response)

        const idToken = response.AuthenticationResult?.IdToken!
        const cookie = await cookies()
        cookie.set("idToken", idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        })

        return NextResponse.json({
            message: "Login success", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
