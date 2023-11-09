import lkService from "../services/lkService.js";

class LkController {
    async personalInfo(req, res) {
        try {
            const user = await lkService.personalInfo(req, res);

            return res.status(200).jsonp(user);
        } catch (e) {
            return res.status(401).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async personalInfoUpdate(req, res) {
        try {
            const updatedUser = await lkService.personalInfoUpdate(req, res);

            return res.status(200).jsonp({
                message: "Данные обновлены!",
                data: updatedUser
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getAddresses(req, res) {
        try {
            const addresses = await lkService.getAddresses(req, res);

            return res.status(200).jsonp(addresses);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getAddress(req, res) {
        try {
            const address = await lkService.getAddressesById(req, res);

            return res.status(200).jsonp(address);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getDefaultAddress(req, res) {
        try {
            const address = await lkService.getDefaultAddress(req, res);

            return res.status(200).jsonp(address);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async createAddress(req, res) {
        try {
            const address = await lkService.createAddresses(req, res);

            return res.status(200).jsonp({
                message: "Данные успешно добавлены",
                data: {}
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async updateAddress(req, res) {
        try {
            const address = await lkService.updateAddresses(req, res);

            return res.status(200).jsonp({
                message: "Данные успешно обновлены",
                data: address
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async deleteAddress(req, res) {
        try {
            const address = await lkService.deleteAddressesById(req, res);

            return res.status(200).jsonp({
                message: "Данные успешно удалены",
                data: {}
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await lkService.getOrders(req, res);

            return res.status(200).jsonp(orders);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async repeatOrders(req, res) {
        try {
            const order = await lkService.repeatOrder();

            return res.status(200).jsonp(order);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async cancelOrder(req, res) {
        try {
            const orders = await lkService.cancelOrder(req, res);

            return res.status(200).jsonp({
                message: "Заказ успешно отменен!",
                data: orders,
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
            const user = await lkService.changePassword(req, res);

            return res.status(200).jsonp({
                message: "Пароль успешно изменен!",
                data: user,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async confirmChangeEmail(req, res) {
        try {
            const user = await lkService.changeEmailConfirm(req, res);

            return res.status(200).jsonp({
                message: "Почта успешно изменена!",
                data: user,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new LkController();
