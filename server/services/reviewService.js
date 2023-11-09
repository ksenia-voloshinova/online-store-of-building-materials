import { db } from "../db/index.js";
import dateService from "./dateService.js";
import paginationService from "./paginationService.js";

class ReviewService {
    constructor() {
        this.limit = 5;
    }

    async createNewReview(res, data) {
        const { name, email, rate, review } = data;

        if (!name || !email || !rate) {
            return res.status(422).jsonp({
                message: "Неверный формат почты или пароля",
                data: {},
            });
        }

        return await this.createReview(data);
    }

    async getReviews(res, page) {
        if (!page) {
            return res.status(400).jsonp({
                message: "Не найдены отзывы",
                data: {},
            });
        }

        await db.read();

        const { reviews } = db.data;
        const { isLastPage, data } = await paginationService.paginateData(reviews, page, this.limit);

        return {
            isLastPage,
            data: data.reverse(),
        };
    }

    async createReview(data) {
        await db.read();

        const { reviews } = db.data;
        const newReview = {
            ...data,
            id: Date.now(),
            photo: "",
            date: dateService.getDateString(),
            reply: ""
        };

        reviews.push(newReview);
        await db.write();

        return newReview;
    }
}

export default new ReviewService();
