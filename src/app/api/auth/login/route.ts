import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"
import { cognito, getSecretHash } from "@/lib/cognito"
import { NextRequest, NextResponse } from "next/server"
import { awsClientSecret } from "@/env"
import { awsClientId} from "@/public-env"
import { cookies } from "next/headers"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"


export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    try {
        const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: awsClientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: getSecretHash(email, awsClientId, awsClientSecret)
            },
        })
        const response = await cognito.send(command)
        console.log(response)

        const idToken = response.AuthenticationResult?.IdToken!
        const accessToken = response.AuthenticationResult?.AccessToken!
        const refreshToken = response.AuthenticationResult?.RefreshToken!
        
        const cookie = await cookies()
        const cookiesOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        } as ResponseCookie
        
        cookie.set("idToken", idToken, cookiesOptions)
        cookie.set("accessToken", accessToken, cookiesOptions)
        cookie.set("refreshToken", refreshToken, cookiesOptions)

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
