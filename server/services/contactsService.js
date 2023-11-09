import { db } from "../db/index.js";

class ContactsService {
    async getInfo(req, res) {
        await db.read();
        const { contactsInfo } = db.data;

        return {
            items: contactsInfo.items,
        };
    }
    async getSeo(req, res) {
        await db.read();

        const { contactsInfo } = db.data;

        return {
            seo: contactsInfo.seo,
        };
    }
}

export default new ContactsService();
