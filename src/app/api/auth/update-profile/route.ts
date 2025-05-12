import { cognito } from "@/lib/cognito";
import { NextRequest, NextResponse } from "next/server";
import { UpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
import { getAccessToken, getRefreshToken, getUserFromToken } from "@/lib/getUserFromToken";
import { awsClientId, awsCognitoBaseUrl } from "@/public-env";
import { awsClientSecret } from "@/env";
import { USER_IMAGE_PLACEHOLDER } from "@/lib/image";
import axios from "axios";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: NextRequest) {
    const { name, pictureUrl } = await req.json()

    const accessToken = await getAccessToken()
    const refreshToken = await getRefreshToken()
    const user = await getUserFromToken()

    console.log(accessToken ? "Access token" : "No access token")
    console.log(refreshToken ? "Refresh token" : "No refresh token")
    console.log(user)

    if (!accessToken || !refreshToken || !user) {
        return NextResponse.json(
            { error: "Unauthorize" },
            { status: 401 }
        )
    }

    try {



        const command = new UpdateUserAttributesCommand({
            UserAttributes: [
                { Name: 'name', Value: name || user.name || 'Unknown user' },
                { Name: 'picture', Value: pictureUrl || user.picture || '' }
            ],
            AccessToken: accessToken,
        })
        // ``` :contentReference[oaicite:4]{index=4}  




        const response = await cognito.send(command)
        console.log(response)

        const params = new URLSearchParams({
            grant_type: "refresh_token",                     // Cognito refresh flow
            client_id: awsClientId,       // :contentReference[oaicite:4]{index=4}
            client_secret: awsClientSecret,// :contentReference[oaicite:5]{index=5}
            refresh_token: refreshToken,                     // your JWE string
        });

        const tokenResp = await axios.post(
            `${awsCognitoBaseUrl}/oauth2/token`,
            params.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );


        console.log(tokenResp.data)

        const idToken = tokenResp.data.id_token
        const newAccessToken = tokenResp.data.access_token

        const cookie = await cookies()
        const cookiesOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        } as ResponseCookie

        cookie.set("idToken", idToken, cookiesOptions)
        cookie.set("accessToken", newAccessToken, cookiesOptions)


        return NextResponse.json({
            message: "Login success", data: response
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
