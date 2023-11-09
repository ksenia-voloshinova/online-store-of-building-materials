import compareService from "../services/compareService.js";

class CompareController {
    async getCompareProducts(req, res) {
        try {
            const products = await compareService.getCompareProducts(res);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async addCompareProducts(req, res) {
        try {
            const products = await compareService.addCompareProducts(res, req.body);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async deleteCompareProduct(req, res) {
        try {
            const elementId = req.params.elementId;
            const products = await compareService.deleteCompareProduct(res, elementId);

            return res.status(200).jsonp(products);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new CompareController();
