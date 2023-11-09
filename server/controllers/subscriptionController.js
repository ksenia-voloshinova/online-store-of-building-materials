import subscriptionService from "../services/subscriptionService.js";

class SubscriptionController {
    async subscribe(req, res) {
        try {
            const { email } = req.body;
            const subscribedEmail = await subscriptionService.subscribe(res, email);

            return res.status(200).json({
                isSubscribed: false,
                message: "Вы успешно подписались на рассылку. Подтвердите ваш e-mail."
            });
        } catch (e) {
            return res.status(404).jsonp({
                isSubscribed: false,
                message: "Ошибка запроса",
            });
        }
    }
}

export default new SubscriptionController();