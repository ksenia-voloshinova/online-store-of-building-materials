import { db } from "../db/index.js";

class GlobalService {
    async getInfo(req, res) {
        await db.read();
        const { global } = db.data;

        return {
            phone: global.phone,
        };
    }
}

export default new GlobalService();
