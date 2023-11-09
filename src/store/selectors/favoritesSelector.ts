import { createSelector } from "reselect";

import { RootState } from "@/store/store";

const selectFavoritesProducts = (state: RootState) => state.favorites.data;

const getIsFavoriteProduct = createSelector(
    [selectFavoritesProducts, (state, id) => id],
    (data, id) => {
        return data.favorites.find(product => product.id === id);
    },
);

const getFavoriteProductsFullPrice = createSelector(
    [selectFavoritesProducts],
    (data) => {
        return +(
            data.favorites.reduce((acc, product) => {
                if (!product.isSalable) return acc;

                return acc + product.fullPrice;
            }, 0).toFixed(2)
        );
    },
);

const getFavoriteProductsWeights = createSelector(
    [selectFavoritesProducts],
    (data) => {
        return +(
            data.favorites.reduce((acc, product) => acc + product.weight, 0).toFixed(2)
        );
    },
);

const getFavoriteProductsVolumes = createSelector(
    [selectFavoritesProducts],
    (data) => {
        return +(
            data.favorites.reduce((acc, product) => acc + product.volume, 0).toFixed(3)
        );
    },
);

export { getFavoriteProductsFullPrice, getFavoriteProductsVolumes, getFavoriteProductsWeights, getIsFavoriteProduct };
