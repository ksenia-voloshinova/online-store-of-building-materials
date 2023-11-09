import { fetchReview, fetchReviews } from "@/api/api";
import { IReviewPost } from "@/types/productDetail";

class ReviewService {
    async getReviews(uuid: string | number, page: number) {
        return await fetchReviews(uuid, page)
            .then(({ isLastPage, data }) => {
                return { status: 200, isLastPage, data };
            })
            .catch(({ response }) => {
                const { status, data } = response;

                return { status, message: data.message, isLastPage: false, data: null };
            });
    }

    async createReview(uuid: number, data: IReviewPost) {
        return await fetchReview(uuid, data)
            .then(({ message, data }) => {
                return { status: 200, message, data };
            })
            .catch(({ response }) => {
                const { status, data } = response;

                return { status, message: data.message, data: null };
            });
    }
}

export default new ReviewService();
