import { db } from "../db/index.js";
import paginationService from "./paginationService.js";

class FavoritesService {
    constructor() {
        this.limit = 3;
    }

    async getFavoritesProducts(req, res) {
        await db.read();
        const { favorites } = db.data;

        if (!favorites.length) {
            return res.status(404).jsonp({
                message: "Нет избранных товаров",
                data: {},
            });
        }

        const pageNumber = +req.query.page;

        if (!pageNumber) {
            return res.status(200).jsonp({
                pageNumber: 0,
                pageCount: 0,
                productsCount: favorites.length,
                favorites,
            });
        }

        const { data, pageCount } = await paginationService.paginateData(favorites, +pageNumber, this.limit);

        return {
            pageNumber,
            pageCount,
            productsCount: favorites.length,
            favorites: data,
        };
    }

    async addFavoritesProducts(res, data) {
        const { id } = data;

        await db.read();
        const { favorites, catalog } = db.data;
        const hasInCompare = favorites.find(product => product.id === id);

        if (hasInCompare) {
            return res.status(400).jsonp({
                message: "Товар уже находится в избранном",
                data: {},
            });
        }

        const foundProduct = catalog.products.find(product => product.id === id);

        if (!foundProduct) {
            return res.status(404).jsonp({
                message: "Товар не найден",
                data: {},
            });
        }

        favorites.push({
            ...foundProduct,
            fullPrice: foundProduct.basePrice,
            "weight": 2,
            "volume": 3,
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

        return favorites;
    }

    async deleteFavoritesProduct(res, id) {
        await db.read();
        const { favorites } = db.data;

        const hasInCompare = favorites.find(product => product.id === +id);

        if (!hasInCompare) {
            return res.status(400).jsonp({
                message: "Товара нет в сравнении",
                data: {},
            });
        }

        db.data.favorites = favorites.filter(product => product.id !== +id);

        await db.write();

        return favorites;
    }
}

export default new FavoritesService();
