import { db } from "../db/index.js";
import tokenService from "./tokenService.js";
import userService from "./userService.js";

class AuthService {
    async registration(res, user) {
        const { email, password } = user;

        if (!email || !password) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        const candidate = await userService.getUserByEmail(email);

        if (candidate) {
            return res.status(409).jsonp({
                message: "Пользователь уже зарегистрирован",
                data: {},
            });
        }

        return await userService.createUser(user);
    }

    async registrationConfirm(res, user) {
        const { email, code } = user;

        if (!email || !code) {
            return res.status(422).jsonp({
                message: "Неверный формат почты",
                data: {},
            });
        }

        return { email };
    }

    async login(res, user) {
        const { email, password } = user;

        if (!email || !password) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        const candidate = await userService.getUserByEmail(email);

        if (!candidate) {
            return res.status(400).jsonp({
                message: "Неверный лоигн",
                data: {},
            });
        }

        const isEqualPassword = candidate.password === password;

        if (!isEqualPassword) {
            return res.status(400).jsonp({
                message: "Неверный пароль",
                data: {},
            });
        }

        return tokenService.generateTokens(candidate);
    }

    async changePassword(res, email) {
        if (!email) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        const candidate = await userService.getUserByEmail(email);

        if (!candidate) {
            return res.status(400).jsonp({
                message: "Пользователь не зарегистрирован",
                data: {},
            });
        }

        return candidate;
    }

    async changePasswordConfirm(res, user) {
        const { email, password, code } = user;

        if (!email || !password || !code) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        const candidate = await userService.getUserByEmail(email);

        if (!candidate) {
            return res.status(400).jsonp({
                message: "Пользователь не зарегистрирован",
                data: {},
            });
        }

        candidate.password = password;
        await db.write();

        return candidate;
    }

    refresh(res, refreshToken) {
        if (!refreshToken) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const userData = tokenService.verifyRefreshToken(refreshToken);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const { firstName, lastName, email, password } = userData;
        const tokens = tokenService.generateTokens({
            firstName,
            lastName,
            email,
            password
        });

        return tokens;
    }
}

export default new AuthService();
