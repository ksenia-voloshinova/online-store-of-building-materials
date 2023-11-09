import { createSlice } from "@reduxjs/toolkit";

import { IFavorite } from "@/types/favorite";

interface IInitState {
    data: IFavorite;
}

const initialState: IInitState = {
    data: {
        pageNumber: 1,
        pageCount: 0,
        productsCount: 0,
        favorites: []
    }
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: initialState,
    reducers: {
        setFavoritesData: (state, action) => {
            state.data = action.payload;
        },
        setFavoritesProducts: (state, action) => {
            state.data.favorites = action.payload;
            state.data.productsCount = action.payload.length;
        }
    },
});

export const {
    setFavoritesData,
    setFavoritesProducts
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
