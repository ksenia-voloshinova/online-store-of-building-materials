import basketService from "../services/basketService.js";

class BasketController {
    async getBasket(req, res) {
        try {
            const basket = await basketService.getBasket(res);

            return res.status(200).jsonp(basket);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async createBasketProduct(req, res) {
        try {
            const product = req.body;
            const basket = await basketService.createBasketProduct(res, product);

            return res.status(200).jsonp(basket);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async deleteBasketProduct(req, res) {
        try {
            const productId = req.params.productId;
            const basket = await basketService.deleteBasketProduct(res, +productId);

            return res.status(200).jsonp(basket);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async updateBasketProduct(req, res) {
        try {
            const productId = req.params.productId;
            const count = req.body.count;
            const basket = await basketService.updateBasketProduct(res, +productId, count);

            return res.status(200).jsonp(basket);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getBasketInfo(req, res) {
        try {
            const basketInfo = await basketService.getBasketInfo(res);

            return res.status(200).jsonp(basketInfo);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async basketReset(req, res) {
        try {
            const basket = await basketService.basketReset(res);

            return res.status(200).jsonp(basket);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async basketPayment(req, res) {
        try {
            const order = await basketService.basketPayment(res, req.body);

            return res.status(200).jsonp(order);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new BasketController();
