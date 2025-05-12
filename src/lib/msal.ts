import axios from "axios";
import { awsClientId, awsCognitoBaseUrl, azureClientId } from "@/public-env";
import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { azureClientSecret } from "@/env";

// export const msalConfig = {
//   auth: {
//     clientId: azureClientId,
//     authority: "https://login.microsoftonline.com/common",
//     redirectUri: window.location.origin,
//   },
//   cache: { cacheLocation: "localStorage" },
// };

// export const msalInstance = new PublicClientApplication(msalConfig);


export const getToken = async (msalInstance: IPublicClientApplication) => {
  const request = { scopes: ["User.Read"] };
  try {
    await msalInstance.loginPopup(request); // or loginRedirect()
    // await msalInstance.loginPopup(request); // or loginRedirect()
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;

  } catch (err) {
    console.error(err);
    return undefined;
  }
}


export const getAccessToken = async (idToken: string) => {


  const params = new URLSearchParams({
    client_id: azureClientId,
    client_secret: azureClientSecret,
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: idToken,
    scope: "https://graph.microsoft.com/.default",
    requested_token_use: "on_behalf_of",
  });

  const resp = await fetch(
    `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );
  
  const { access_token } = await resp.json();
  console.log(access_token)
  return access_token
  // // Now call Graph
  // const graph = await fetch("https://graph.microsoft.com/v1.0/me", {
  //   headers: { Authorization: `Bearer ${access_token}` },
  // });
  // const profile = await graph.json();

  // console.log(profile)
  // return profile


  // const url = `${awsCognitoBaseUrl}/oauth2/token`;
  // const data = {
  //   grant_type: "refresh_token",
  //   client_id: awsClientId,
  //   refresh_token: refreshToken,
  // };

  // try {
  //   const response = await axios.post(url, data, {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });

  //   return response.data.access_token;

  // } catch (error) {
  //   console.error("Error fetching access token:", error);
  //   return undefined;
  // }
};


export const getImageUrl = async (url?: string, token?: string) => {

  if (!url || !token) return null;
  if (!url.includes("graph.microsoft.com")) return url;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      // responseType: "blob",
    });

    console.log(response)
    const objectUrl = URL.createObjectURL(response.data);
    return objectUrl;

  } catch (error) {
    console.error(error);
    return null
  }
}











// "use client";

// import { useEffect, useState } from "react";
// import { useMsalToken } from "@/hooks/useMsalToken";



// export function ProfilePhoto({ url }: { url: string }) {
//   const token = useMsalToken();
//   const [src, setSrc] = useState<string | null>(null);

//   useEffect(() => {
//     if (!url || !token || !url.includes("graph.microsoft.com")) return;
//     fetch(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.blob())
//       .then((blob) => {
//         const objectUrl = URL.createObjectURL(blob);
//         setSrc(objectUrl);
//       })
//       .catch(console.error);
//   }, [url, token]);

//   if (!url) return null;
//   if (url.includes("graph.microsoft.com") && !src) {
//     return <div className="w-12 h-12 bg-gray-200 rounded-full" />;
//   }
//   return <img src={ src ?? url } className = "w-12 h-12 rounded-full" alt = "avatar" />;
// }
