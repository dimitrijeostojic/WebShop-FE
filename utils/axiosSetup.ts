// // utils/axiosSetup.ts
// import axios from "axios";
// import { getCookie, setCookie } from "./auth";

// const api = axios.create({
//   baseURL: "https://localhost:7273/api",
// });

// api.interceptors.request.use((config) => {
//   const token = getCookie("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       getCookie("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post("https://localhost:7273/api/Auth/Refresh", {
//           refreshToken: getCookie("refreshToken"),
//         });

//         setCookie("token", res.data.jwtToken);
//         setCookie("refreshToken", res.data.refreshToken);

//         originalRequest.headers.Authorization = `Bearer ${res.data.jwtToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         document.cookie = "token=; Max-Age=0";
//         document.cookie = "refreshToken=; Max-Age=0";
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
