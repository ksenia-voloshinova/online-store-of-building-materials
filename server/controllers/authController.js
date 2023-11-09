import authService from "../services/authService.js";

class AuthController {
    async registration(req, res) {
        try {
            const currentUser = await authService.registration(res, req.body);

            return res.status(200).jsonp({
                message: "Сообщение о подтверждении почты отправлено",
                data: currentUser,
            });
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async confirmRegistration(req, res) {
        try {
            const user = await authService.registrationConfirm(res, req.body);

            return res.status(200).jsonp({
                message: "Аккаунт успешно активирован!",
                data: user,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async login(req, res) {
        try {
            const tokens = await authService.login(res, req.body);

            res.status(200).json({
                message: "Пользователь успешно авторизирован",
                data: tokens,
            });

            return res.status(200).jsonp({
                message: "Пользователь успешно авторизирован",
                data: tokens,
            });
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("refreshToken");
            res.clearCookie("token");

            return res.status(200).jsonp({
                message: "Пользователь успешно вышел",
                data: {},
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async changePassword(req, res) {
        try {
            const { email } = req.body;

            const user = await authService.changePassword(res, email);

            return res.status(200).jsonp({
                message: "Данные успешно высланы на почту",
                data: user,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async confirmChangePassword(req, res) {
        try {
            const user = await authService.changePasswordConfirm(res, req.body);

            return res.status(200).jsonp({
                message: "Пароль успешно изменен",
                data: user,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            const tokens = authService.refresh(res, refreshToken);

            return res.status(200).jsonp({
                message: "Токены обновлены",
                data: tokens,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new AuthController();
