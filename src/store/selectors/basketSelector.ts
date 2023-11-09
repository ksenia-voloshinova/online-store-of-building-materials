import { createSelector } from "reselect";

import { RootState } from "@/store/store";

const selectBasketProducts = (state: RootState) => state.basket.products;

const getBasketProduct = createSelector(
    [selectBasketProducts, (state, id) => id],
    (products, id) => {
        return products.find(product => product.id === id);
    },
);

export { getBasketProduct };
