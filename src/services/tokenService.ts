import cookies from "js-cookie";
import jwt from "jwt-decode";

class TokenService {
    setToken(token: string) {
        // @ts-ignore
        const expires = new Date(jwt(token)?.exp * 1000);

        cookies.set("token", token, {
            secure: true,
            path: "/",
            sameSite: "none",
            expires,
            domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.NEXT_PUBLIC_BASE_DOMAIN
        });
    }
    
    deleteToken() {
        cookies.remove("token");
    }

    setRefreshToken(refreshToken: string) {
        localStorage.setItem("refreshToken", refreshToken);
    }

    getRefreshToken() {
        return localStorage.getItem("refreshToken") ?? "";
    }
    
    deleteRefreshToken() {
        localStorage.removeItem("refreshToken");
    }
}

export default new TokenService();