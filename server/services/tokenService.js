import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET= "jwt-secret-key";
const JWT_REFRESH_SECRET= "jwt-refresh-secret-key";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "24h" });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return { accessToken, refreshToken };
    }

    verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    }

    verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    }
    
    validateAccessToken(req, res) {
        const token = req.cookies?.token ?? "";

        if (!token) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        return this.verifyAccessToken(token) ?? {};
    }
}

export default new TokenService();