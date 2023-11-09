import { db } from "../db/index.js";

class FeedbackService {
    async supplier(res, data) {
        if (!data) {
            return res.status(422).jsonp({
                message: "Неверный формат",
                data: {},
            });
        }
		
        await db.read();
		
        const { suppliers } = db.data;

        suppliers.push({
            ...data,
            id: Date.now()
        });
        await db.write();
		
        return data;
    }
	
    async dealer(res, data) {
        if (!data) {
            return res.status(422).jsonp({
                message: "Неверный формат",
                data: {},
            });
        }

        await db.read();

        const { dealers } = db.data;

        dealers.push({
            ...data,
            id: Date.now()
        });
        await db.write();

        return data;
    }
}

export default new FeedbackService();