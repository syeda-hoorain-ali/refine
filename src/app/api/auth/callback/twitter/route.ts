import { awsClientSecret, } from '@/env'
import { awsClientId, awsCognitoBaseUrl, baseURL } from '@/public-env'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
    
    console.log(req)
    const searchParams = req.nextUrl.searchParams;
    
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')
    console.log(error, error_description)

    if (error) {
        return NextResponse.json({ error, error_description }, { status: 400 })
    }

    const code = req.nextUrl.searchParams.get('code')
    console.log(code)

    if (!code) {
        return NextResponse.json({ error: 'Code not found in query' }, { status: 400 })
    }

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: awsClientId,
        code,
        redirect_uri: `${baseURL}/api/auth/callback/twitter`, // must match Cognito App Client settings
    })

    const response = await fetch(`${awsCognitoBaseUrl}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${awsClientId}:${awsClientSecret}`
            ).toString('base64')}`,
        },
        body,
    })

    const data = await response.json()

    if (!response.ok) {
        console.error(data)
        return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 })
    }

    const { id_token } = data

    // Store token in cookie (HttpOnly)
    const res = NextResponse.redirect(baseURL) // or any protected page
    res.cookies.set('idToken', id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    })

    return res
}
