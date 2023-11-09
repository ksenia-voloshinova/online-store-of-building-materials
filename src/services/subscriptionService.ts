import { fetchSubscription } from "@/api/api";

class SubscriptionService {
    async subscribe(email: string) {
        return await fetchSubscription(email)
            .then(({ message }) => {
                return { status: 200, message };
            })
            .catch(({ response }) => {
                const { status, data } = response;
                
                return { status, message: data.message };
            });
    }
}

export default new SubscriptionService();