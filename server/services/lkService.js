import { db } from "../db/index.js";
import paginationService from "./paginationService.js";
import tokenService from "./tokenService.js";
import userService from "./userService.js";

class LkService {
    constructor() {
        this.limit = 5;
    }

    async personalInfo(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const user = await userService.getUserById(userData.id);
        const { firstName, lastName, email, phone } = user;

        return {
            firstName,
            lastName,
            email,
            phone,
        };
    }

    async personalInfoUpdate(req, res) {
        const updatedUserData = req.body;
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const { firstName, lastName, email, phone } = updatedUserData;

        if (!firstName || !lastName || !email || !phone) {
            return res.status(422).jsonp({
                message: "Неверный формат имени, почты или телефона",
                data: {},
            });
        }

        const user = await userService.getUserById(userData.id);

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await db.write();

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };
    }

    async getAddresses(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        return await this.getAllAddresses();
    }

    async getAddressesById(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const id = req.params.id;

        if (!id) {
            return res.status(400).jsonp({
                message: "Ошибка получения адреса, нет ид адреса",
                data: {},
            });
        }

        const addresses = await this.getAllAddresses();

        return addresses.find(address => address.id === id);
    }

    async getDefaultAddress(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        await db.read();
        const { addresses } = db.data;
        const defaultAddress = addresses.find(address => address.isDefault);

        if (!defaultAddress) {
            return res.status(404).jsonp({
                message: "Адрес не установлен",
                data: [],
            });
        }

        return {
            "id": "address-1",
            "name": "Офис",
            "city": "Тюмень",
            "street": "Пермякова",
            "house": "1c5",
            "apartment": "903",
            "isDefault": true
        };
    }

    async createAddresses(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const { name, city, street } = req.body;

        if (!name || !city || !street) {
            return res.status(422).jsonp({
                message: "Неверный формат полей",
                data: {},
            });
        }

        const addresses = await this.getAllAddresses();

        addresses.push({
            ...req.body,
            id: Date.now().toString(),
        });
        await db.write();

        return addresses;
    }

    async updateAddresses(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        let { name, city, street, house, apartment, isDefault } = req.body;

        if (!name || !city || !street) {
            return res.status(422).jsonp({
                message: "Неверный формат полей",
                data: {},
            });
        }
        const addressId = req.params.id;
        const foundAddress = await this.getAddressById(addressId);

        if (!foundAddress) {
            return res.status(400).jsonp({
                message: "Адрес не найден",
                data: {},
            });
        }

        foundAddress.name = name;
        foundAddress.city = city;
        foundAddress.street = street;
        foundAddress.house = house;
        foundAddress.apartment = apartment;
        foundAddress.isDefault = isDefault;

        await db.write();

        return foundAddress;
    }

    async deleteAddressesById(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const id = req.params.id;

        if (!id) {
            return res.status(400).jsonp({
                message: "Ошибка получения адреса, нет ид адреса",
                data: {},
            });
        }

        const addresses = await this.getAllAddresses();

        db.data.addresses = addresses.filter(address => address.id !== id);
        await db.write();

        return addresses.find(address => address.id === id);
    }

    async getOrders(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        await db.read();
        const { orders } = db.data;
        const pageNumber = +req.query.page;
        const { data, pageCount } = await paginationService.paginateData(orders, +pageNumber, this.limit);

        return {
            pageNumber,
            pageCount,
            orders: data,
        };
    }

    async cancelOrder(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }
        const id = req.body.id;

        if (!id) {
            return res.status(400).jsonp({
                message: "Ошибка отмены заказа",
                data: {},
            });
        }

        await db.read();

        return db.data.orders;
    }

    async changePassword(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Пользователь не авторизован",
                data: {},
            });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        const user = await userService.getUserById(userData.id);
        const isEqualOldPassword = oldPassword === user.password;

        if (!isEqualOldPassword) {
            return res.status(400).jsonp({
                message: "Неверный старый пароль",
                data: {},
            });
        }

        user.password = newPassword;
        await db.write();

        return user;
    }

    async changeEmailConfirm(req, res) {
        const userData = tokenService.validateAccessToken(req, res);

        if (!userData) {
            return res.status(401).jsonp({
                message: "Чтобы подтвердить смену почты - авторизуйтесь",
                data: {},
            });
        }

        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(422).jsonp({
                message: "Неверный формат почты",
                data: {},
            });
        }

        const candidate = await userService.getUserById(userData.id);

        if (!candidate) {
            return res.status(400).jsonp({
                message: "Пользователь не зарегистрирован",
                data: {},
            });
        }

        candidate.email = email;
        await db.write();

        return candidate;
    }

    async getAllAddresses() {
        await db.read();

        return db.data.addresses;
    }

    async getAddressById(id) {
        await db.read();

        return db.data.addresses.find(address => address.id === id);
    }

    async repeatOrder() {
        await db.read();

        const { orders } = db.data;

        return orders.reduce((acc, order) => {
            return [...acc, {
                ...order,
                converters: [
                    {
                        "name": "лист",
                        "code": "list",
                        "codeOKEI": 0,
                        "multiplier": 0.5
                    }
                ]
            }];
        });
    }
}

export default new LkService();
