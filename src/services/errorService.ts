import { ROUTES } from "@/routes";

class ErrorService {
    getError(error: any) {
        const status = error.response.status;

        if (status === 401) {
            return {
                redirect: {
                    destination: ROUTES.login,
                    permanent: false,
                },
            };
        } else if (status >= 500) {
            return {
                redirect: {
                    destination: ROUTES.error500,
                    permanent: false,
                },
            };
        } else {
            return {
                notFound: true,
            };
        }
    }
}

export default new ErrorService();
