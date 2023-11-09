import { db } from "../db/index.js";
import dateService from "./dateService.js";

class BasketService {
    async getBasket(res) {
        await db.read();
        const { basket } = db.data;

        if (!basket.length) {
            return res.status(404).jsonp({
                message: "Корзина пуста",
                data: {},
            });
        }

        return this.getBasketInfoTotal(res);
    }

    async createBasketProduct(res, product) {
        const { id, count } = product;

        if (!id || !count) {
            return res.status(400).jsonp({
                message: "Не удалось добавить в корзину",
                data: {},
            });
        }

        await db.read();
        const { catalog, basket } = db.data;
        const foundProduct = catalog.products.find(product => product.id === id);

        if (!foundProduct) {
            return res.status(404).jsonp({
                message: "Товар не найден",
                data: {},
            });
        }
        const { link, image, name, basePrice, salePrice, isSale, rate } = foundProduct;
        const currentBasePrice = isSale ? salePrice : basePrice;

        basket.push({
            id,
            count,
            link,
            image,
            name,
            rate,
            basePrice,
            fullPrice: currentBasePrice * count,
            "measureCode": "metr",
            "measureName": "м2",
            "article": "ZRKM-1070",
            "converters": [
                {
                    "name": "лист",
                    "code": "list",
                    "codeOKEI": 0,
                    "multiplier": 0.5
                }
            ]
        });

        await db.write();

        return this.getBasketInfoTotal(res);
    }

    async deleteBasketProduct(res, productId) {
        if (!productId) {
            return res.status(400).jsonp({
                message: "Не удалось удалить товар",
                data: {},
            });
        }

        await db.read();
        const { basket } = db.data;
        const foundProduct = basket.find(product => product.id === productId);

        if (!foundProduct) {
            return res.status(404).jsonp({
                message: "Товар отсутствует в корзине",
                data: {},
            });
        }

        db.data.basket = basket.filter(product => product.id !== productId);

        await db.write();

        return this.getBasketInfoTotal(res);
    }

    async updateBasketProduct(res, productId, count) {
        if (!productId || !count) {
            return res.status(400).jsonp({
                message: "Не удалось обновить товар",
                data: {},
            });
        }

        await db.read();
        let { basket } = db.data;
        const foundProduct = basket.find(product => product.id === productId);

        if (!foundProduct) {
            return res.status(404).jsonp({
                message: "Товар отсутствует в корзине",
                data: {},
            });
        }

        const index = basket.findIndex(product => product.id === productId);

        basket[index] = {
            ...foundProduct,
            count,
            fullPrice: count * foundProduct.basePrice,
        };

        await db.write();

        return this.getBasketInfoTotal(res);
    }

    async getBasketInfo(res) {
        await db.read();
        const { basket } = db.data;

        return {
            weight: 1.53,
            volume: 1.63,
            fullPrice: basket.reduce((acc, product) => acc + product.fullPrice, 0),
            count:  basket.reduce((acc, product) => acc + product.count, 0)
        };
    }

    async getBasketInfoTotal(res) {
        await db.read();
        const { basket } = db.data;

        return {
            products: basket,
            info: await this.getBasketInfo(res)
        };
    }

    async basketReset(res) {
        await db.read();

        db.data.basket = [];

        await db.write();

        return this.getBasketInfoTotal(res);
    }

    async basketPayment(res, data) {
        if (!data) {
            return res.status(400).jsonp({
                message: "Не удалось оформить заказ",
                data: {},
            });
        }

        await db.read();

        const formattedProducts = db.data.basket.reduce((acc, product) => {
            const { id, name, image, link, article, basePrice, fullPrice, count, measureCode, measureName } = product;

            return [...acc, { id, name, image, link, article, basePrice, fullPrice, count, measureCode, measureName }];
        }, []);
        const id = Date.now();
        const newOrder = {
            id,
            orderNumber: `03МС-${id}`,
            datetime: dateService.getDateString(),
            fullPrice: formattedProducts.reduce((acc, product) => acc + product.fullPrice, 0),
            basePrice: 0,
            status: "Отменить",
            statusCode: "string",
            actions: {
                canRepeat: false,
                canPay: false,
                canCancel: true
            },
            payment: {
                link: "#",
                status: "string"
            },
            items: formattedProducts,
        };

        db.data.orders.push(newOrder);

        await db.write();
        await this.basketReset(res);

        return {
            orderNumber: newOrder.orderNumber,
            email: data.customer.customerData.email,
        };
    }
}

export default new BasketService();
