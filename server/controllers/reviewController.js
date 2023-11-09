import reviewService from "../services/reviewService.js";
import tokenService from "../services/tokenService.js";

class ReviewController {
    async getReviews(req, res) {
        try {
            const reviews = await reviewService.getReviews(res, req.query.page);

            return res.status(200).jsonp(reviews);
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
            });
        }
    }
    
    async createReview(req, res) {
        try {
            const userData = tokenService.validateAccessToken(req, res);

            if (!userData) {
                return res.status(401).jsonp({
                    message: "Пользователь не авторизован",
                    data: {},
                });
            }
            
            const review = await reviewService.createNewReview(res, req.body);

            return res.status(200).jsonp({
                message: "Спасибо за оставленный отзыв!",
                data: review,
            });
        } catch(e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
            });
        }
    }
}

export default new ReviewController();