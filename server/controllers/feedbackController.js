import feedbackService from "../services/feedbackService.js";

class FeedbackController {
    async supplier(req, res) {
        try {
            const supplier = await feedbackService.supplier(res, req.body);

            return res.status(200).jsonp({
                message: "Спасибо за обратную свзяь!",
                data: supplier,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async dealer(req, res) {
        try {
            const dealer = await feedbackService.dealer(res, req.body);

            return res.status(200).jsonp({
                message: "Спасибо за обратную свзяь!",
                data: dealer,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new FeedbackController();