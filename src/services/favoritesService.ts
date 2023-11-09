import {
    fetchAddToFavorites,
    fetchDeleteFromFavorites,
    fetchFavoritesSendEmail,
    fetchGetFavorites,
    fetchGetFavoritesLink
} from "@/api/api";
import { IFavoritesProductPost, IFavoritesSendEmail } from "@/types/favorite";

class FavoritesService {
    async getFavoritesProducts(config = {}) {
        return await fetchGetFavorites(config)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return {
                    status,
                    data: {
                        pageNumber: 1,
                        pageCount: 0,
                        productsCount: 0,
                        favorites: []
                    }
                };
            });
    }

    async addFavoritesProducts(product: IFavoritesProductPost) {
        return await fetchAddToFavorites(product)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async deleteFavoritesProducts(id: number) {
        return await fetchDeleteFromFavorites(id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async sendFavoritesProductsToEmail(data: IFavoritesSendEmail) {
        return await fetchFavoritesSendEmail(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async getFavoritesPdfLink() {
        return await fetchGetFavoritesLink()
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new FavoritesService();
