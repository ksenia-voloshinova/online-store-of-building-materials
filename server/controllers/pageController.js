class PageController {
    async getPageType(req, res) {
        try {
            const slugs = req.params["0"].split("/");
            let type = "";
            
            if (slugs.length > 3) {
                type = "detail";
            } else {
                type = "catalog";
            }
            
            return res.status(200).json({
                type,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new PageController();