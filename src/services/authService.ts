import { GetServerSidePropsContext } from "next";

import {
    fetchChangePassword,
    fetchConfirmChangePassword,
    fetchConfirmRegistration,
    fetchLogin,
    fetchLogout,
    fetchRefresh,
    fetchRegistration,
} from "@/api/api";
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/routes";
import basketService from "@/services/basketService";
import compareService from "@/services/compareService";
import favoritesService from "@/services/favoritesService";
import profileService from "@/services/profileService";
import tokenService from "@/services/tokenService";
import {
    IConfirmChangePasswordReq,
    IConfirmRegistrationReq,
    TChangePassword,
    TLogin,
    TRegistration,
} from "@/types/auth";

class AuthService {
    async getaAuthStatus(context: GetServerSidePropsContext) {
        const url = context.resolvedUrl;
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
            }
        };
        const isFavPage = url === ROUTES.favorite;
        const basket = await basketService.getBasket(config);
        const compareProducts = await compareService.getCompareProducts(config);
        const favoritesProducts = await favoritesService.getFavoritesProducts(
            isFavPage
                ? {
                    ...config,
                    params: { page: 1 }
                }
                : config
        );
        const userInfo = await profileService.getUserPersonalInfo(config);

        return {
            isPrivate: Object.values(PRIVATE_ROUTES).some(route => route === url),
            isPublic: Object.values(PUBLIC_ROUTES).some(route => route === url),
            status: userInfo.status,
            user: userInfo.data,
            basket: basket.data,
            compareProducts: compareProducts.data,
            favoritesProducts: favoritesProducts.data,
        };
    }

    async refresh() {
        const refreshToken = tokenService.getRefreshToken() ?? "";

        return await fetchRefresh(refreshToken)
            .then(async ({ data }) => {
                tokenService.setToken(data.accessToken);
                tokenService.setRefreshToken(data.refreshToken);

                return { status: 200, data };
            })
            .catch(async (error: any) => {
                tokenService.deleteRefreshToken();

                return { status: error.response.status, data: {} };
            });
    }

    async login(data: TLogin) {
        return await fetchLogin(data)
            .then(({ data }) => {
                tokenService.setToken(data.accessToken);
                tokenService.setRefreshToken(data.refreshToken);

                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async registration(data: TRegistration) {
        return await fetchRegistration(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async confirmRegistration(data: IConfirmRegistrationReq) {
        return await fetchConfirmRegistration(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async changePassword(data: TChangePassword) {
        return await fetchChangePassword(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async confirmChangePassword(data: IConfirmChangePasswordReq) {
        return await fetchConfirmChangePassword(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async logout() {
        return await fetchLogout()
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new AuthService();
