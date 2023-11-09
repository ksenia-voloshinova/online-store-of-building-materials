import { createSlice } from "@reduxjs/toolkit";

import { ICompareGroup } from "@/types/compare";

interface IInitState {
    products: ICompareGroup[];
}

const initialState: IInitState = {
    products: []
};

const compareSlice = createSlice({
    name: "compare",
    initialState: initialState,
    reducers: {
        setCompareProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const {
    setCompareProducts
} = compareSlice.actions;

export default compareSlice.reducer;
