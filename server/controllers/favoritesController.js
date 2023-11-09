import favoritesService from "../services/favoritesService.js";

class FavoritesController {
    async getProducts(req, res) {
        try {
            const products = await favoritesService.getFavoritesProducts(req, res);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async addProducts(req, res) {
        try {
            const products = await favoritesService.addFavoritesProducts(res, req.body);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const products = await favoritesService.deleteFavoritesProduct(res, id);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async getPdfLink(req, res) {
        try {

            return res.status(200).jsonp({
                link: "/static/5.2-_-Tekhlist-Sayding-D_cke-LUX.pdf"
            });
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async sendEmail(req, res) {
        try {
            return res.status(200).jsonp({
                message: "Письмо на почту успешно отправлено!"
            });
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new FavoritesController();
