// // app/api/graph/route.ts
// import { awsClientSecret, azureClientSecret, azureTenantId } from "@/env";
// import { awsClientId, awsCognitoBaseUrl, azureClientId } from "@/public-env";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest) {

//     const refreshToken = req.cookies.get('refreshToken')?.value

//     const cookie = await cookies()
//     const idToken = cookie.get("refreshToken")?.value

//     if (!refreshToken) {
//         return NextResponse.json({ error: "Unauthorize" }, { status: 401 })
//     }

//     console.log(refreshToken)


//     // Exchange Cognito id_token for Graph token via OBO
//     const params = new URLSearchParams({
//         client_id: azureClientId,
//         client_secret: azureClientSecret,
//         grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
//         assertion: refreshToken,
//         scope: "https://graph.microsoft.com/.default",
//         requested_token_use: "on_behalf_of",
//     });

//     const resp = await fetch(
//         `https://login.microsoftonline.com/${azureTenantId}/oauth2/v2.0/token`,
//         {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: params,
//         }
//     );

//     const data = await resp.json();




//     // const params = new URLSearchParams({
//     //     grant_type: "refresh_token",                     // Cognito refresh flow
//     //     client_id: awsClientId,       // :contentReference[oaicite:4]{index=4}
//     //     client_secret: awsClientSecret,// :contentReference[oaicite:5]{index=5}
//     //     refresh_token: refreshToken,                     // your JWE string
//     // });

//     // const tokenResp = await fetch(
//     //     `${awsCognitoBaseUrl}/oauth2/token`,
//     //     {
//     //         method: "POST",
//     //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     //         body: params,
//     //     }
//     // );
//     // if (!tokenResp.ok) {
//     //     const err = await tokenResp.json();
//     //     return NextResponse.json({ error: err }, { status: tokenResp.status });
//     // }

//     // const data = await tokenResp.json();
//     console.log(data)


//     console.log(data.access_token ? "access token get from graph api" : "error getting access token")


//     // 2) Call Graph on behalf of your app  
//     const photoRes = await fetch(
//         `https://graph.microsoft.com/v1.0/users/${userPrincipalName}/photo/$value`,
//         { headers: { Authorization: `Bearer ${data.access_token}` } }
//     );
//     const arrayBuffer = await photoRes.arrayBuffer();
//     const base64 = Buffer.from(arrayBuffer).toString("base64");
//     return NextResponse.json({ photo: `data:image/jpeg;base64,${base64}` });


//     // Now call Graph
//     // const graph = await fetch("https://graph.microsoft.com/v1.0/me", {
//     //     headers: { Authorization: `Bearer ${data.access_token}` },
//     // });


//     // const profile = await graph.json();


//     console.log(profile)

//     return NextResponse.json(profile);
// }
