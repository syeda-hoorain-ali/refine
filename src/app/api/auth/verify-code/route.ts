import { cookies } from "next/headers"
import { awsClientSecret } from "@/env"
import { cognito, getSecretHash } from "@/lib/cognito"
import { ConfirmSignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"
import { NextRequest, NextResponse } from "next/server"
import { awsClientId } from "@/public-env"

export async function POST(req: NextRequest) {
    const { email, password, code } = await req.json()

    try {
        const command = new ConfirmSignUpCommand({
            ClientId: awsClientId,
            Username: email,
            ConfirmationCode: code,
            SecretHash: getSecretHash(email, awsClientId, awsClientSecret),
        })
        await cognito.send(command)



        const loginCommand = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: awsClientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: getSecretHash(email, awsClientId, awsClientSecret)
            },
        })

        const response = await cognito.send(loginCommand)
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
            message: "User confirmed", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
