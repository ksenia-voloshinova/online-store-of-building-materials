import { db } from "../db/index.js";

class CompareService {
    async getCompareProducts(res) {
        await db.read();
        const { compare } = db.data;

        if (!compare.length) {
            return res.status(404).jsonp({
                message: "Нет сравниваемых товаров пуста",
                data: {},
            });
        }

        return compare;
    }

    async addCompareProducts(res, data) {
        const { elementId, productId } = data;

        await db.read();
        const { compare, catalog } = db.data;
        const hasInCompare = compare[0].data.find(product => product.elementId === elementId);

        if (hasInCompare) {
            return res.status(400).jsonp({
                message: "Товар уже находится в сравнении",
                data: {},
            });
        }

        const foundProduct = catalog.products.find(product => product.elementId === elementId);

        if (!foundProduct) {
            return res.status(404).jsonp({
                message: "Товар не найден",
                data: {},
            });
        }

        compare[0].data.push({
            ...foundProduct,
            "characteristics": [
                {
                    "id": 1,
                    "name": "АртикулАртикулАртикулАртикулАртикул",
                    "value": "ZRKM-1025"
                },
                {
                    "id": 2,
                    "name": "Бренд",
                    "value": "Docke"
                },
                {
                    "id": 3,
                    "name": "Толщина, мм",
                    "value": 2.8
                },
                {
                    "id": 4,
                    "name": "Длина, мм",
                    "value": 1000
                }
            ]
        });

        await db.write();

        return compare;
    }

    async deleteCompareProduct(res, elementId) {
        await db.read();
        const { compare } = db.data;

        const hasInCompare = compare[0].data.find(product => product.elementId === +elementId);

        if (!hasInCompare) {
            return res.status(400).jsonp({
                message: "Товара нет в сравнении",
                data: {},
            });
        }

        db.data.compare[0].data = compare[0].data.filter(product => product.elementId !== +elementId);

        await db.write();

        return compare;
    }
}

export default new CompareService();
