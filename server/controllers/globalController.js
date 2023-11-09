// import GlobalService from "../services/contactsService";
import GlobalService from "../services/globalService.js";

class GloabalController {
    async getGloabalsInfo(req, res) {
        try {
            const data = await GlobalService.getInfo();

            return res.status(200).jsonp(data);
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new GloabalController();
