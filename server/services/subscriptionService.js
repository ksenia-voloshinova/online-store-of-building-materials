import userService from "./userService.js";

class SubscriptionService {
    async subscribe(res, email) {
        const user = await userService.getSubscribedUserByEmail(email);

        if (user) {
            return res.status(200).json({
                isSubscribed: true,
                message: "Вы уже подписаны на рассылку!"
            });
        }

        return await userService.createSubscriptionUser(email);
    }
}

export default new SubscriptionService();