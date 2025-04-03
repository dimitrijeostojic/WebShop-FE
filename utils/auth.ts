// // utils/auth.ts
// import { jwtDecode } from "jwt-decode";
// import api from "./axiosSetup";

// export interface DecodedToken {
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
//   exp: number;
// }

// export function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
//   return null;
// }

// export function setCookie(name: string, value: string, days = 7) {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${value}; path=/; expires=${expires}`;
// }

// export async function getAccessToken(): Promise<string | null> {
//   const token = getCookie("token");

//   if (token) {
//     try {
//       const decoded = jwtDecode(token) as DecodedToken;
//       const now = Date.now() / 1000;

//       if (decoded.exp < now) {
//         const refreshToken = getCookie("refreshToken");
//         if (!refreshToken) return null;

//         const response = await api.post("/Auth/Refresh", { refreshToken });
//         setCookie("token", response.data.jwtToken);
//         setCookie("refreshToken", response.data.refreshToken);
//         return response.data.jwtToken;
//       }

//       return token;
//     } catch (err) {
//       console.error("Invalid or expired token", err);
//       return null;
//     }
//   }

//   return null;
// }
