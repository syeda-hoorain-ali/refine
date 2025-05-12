// // hooks/useMsalToken.ts
// import { msalInstance } from "@/lib/msal";
// import { useEffect, useState } from "react";

// export function useMsalToken() {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const request = { scopes: ["User.Read"] };
//     msalInstance
//       .loginPopup(request)           // or loginRedirect()
//       .then((resp) => msalInstance.acquireTokenSilent(request))
//       .then((resp) => setToken(resp.accessToken))
//       .catch((err) => console.error(err));
//   }, []);

//   return token;
// }
