import { fetchDealerFeedback, fetchSupplierFeedback } from "@/api/api";
import { IDealer, ISupplier } from "@/types";

class FeedbackService {
    async supplier(data: FormData) {
        return await fetchSupplierFeedback(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async dealer(data: IDealer) {
        return await fetchDealerFeedback(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new FeedbackService();