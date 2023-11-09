class DomainController {
    async getDomain(req, res) {
        const { userDomain } = req.cookies;

        try {
            return res.status(200).jsonp({
                slug: "main",
                domain: "localhost:3000",
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }

    async postDomain(req, res) {
        try {
            const { slug } = req.body;

            res.cookie("userDomain", slug);

            return res.status(200).jsonp({
                slug: slug,
                domain: `${slug}.localhost:3000`,
            });
        } catch (e) {
            return res.status(404).jsonp({
                message: "Ошибка запроса",
                data: {},
            });
        }
    }
}

export default new DomainController();
