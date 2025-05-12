// app/api/graph/route.ts
import { azureClientSecret, azureTenantId } from "@/env";
import { azureClientId } from "@/public-env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function parseJwt(token: string): Record<string, any> {
    try {
        const payload = token.split(".")[1];
        const json = Buffer.from(payload, "base64").toString("utf8");
        return JSON.parse(json);
    } catch {
        return {};
    }
}

export async function GET() {
    // 1) read the Cognito‐stored id_token (JWT) from cookie
    const cookieStore = await cookies();
    const idToken = cookieStore.get("idToken")?.value;
    if (!idToken) {
        return NextResponse.json({ error: "Missing id_token" }, { status: 401 });
    }

    // 2) decode it to get the user's UPN/email
    const claims = parseJwt(idToken);

    console.log(claims)
    const userPrincipalName =
        claims.preferred_username || claims.upn || claims.email;
    if (!userPrincipalName) {
        return NextResponse.json(
            { error: "Cannot determine user principal name from id_token" },
            { status: 400 }
        );
    }



    // 3) get an app‑only Graph token via client_credentials
    const params = new URLSearchParams({
        client_id: azureClientId,
        client_secret: azureClientSecret,
        grant_type: "client_credentials",
        scope: "https://graph.microsoft.com/.default",
    });

    const tokenRes = await fetch(
        `https://login.microsoftonline.com/${azureTenantId}/oauth2/v2.0/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        }
    );
    if (!tokenRes.ok) {
        const err = await tokenRes.json();
        return NextResponse.json(
            { error: "Failed to acquire Graph token", details: err },
            { status: tokenRes.status }
        );
    }


    const data = await tokenRes.json();

    console.log(data)
    console.log(parseJwt(data.access_token))

    // 4) call Graph to fetch the user's photo bytes
    const photoRes = await fetch(
        `https://graph.microsoft.com/v1.0/me/photo/$value`,
        // `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(userPrincipalName)}/photo/$value`,
        { headers: { Authorization: `Bearer ${data.access_token}` } }
    );

    const text = await photoRes.json();


    console.log(text)

    if (!photoRes.ok) {
        // const text = await photoRes.json();
        return NextResponse.json(
            { error: "Could not fetch photo", details: text },
            { status: photoRes.status }
        );
    }

    // 5) convert to base64 data‑URI
    const buffer = await photoRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = photoRes.headers.get("content-type") || "image/jpeg";
    const dataUri = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ photo: dataUri });
}
