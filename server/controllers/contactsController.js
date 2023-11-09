import contactsService from "../services/contactsService.js";

class ContactController {
    async getContactsInfo(req, res) {
        try {
            const items = await contactsService.getInfo();

            return res.status(200).jsonp(items);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
    async getContactsPageSeo(req, res) {
        try {
            const info = await contactsService.getSeo();

            return res.status(200).jsonp(info);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new ContactController();
