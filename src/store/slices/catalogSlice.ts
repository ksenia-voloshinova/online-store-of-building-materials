import { createSlice } from "@reduxjs/toolkit";

import { fetchCatalogFilters } from "@/api/api";
import FilterService from "@/services/filterService";
import paramsService from "@/services/paramsService";
import { AppDispatch, Store } from "@/store/store";
import { ICheckedParams, TFilter } from "@/types/catalog";

interface IInitState {
    page: 1,
    sort: string;
    filters: ICheckedParams;
    filtersData: TFilter;
    cardType: string;
}

const initialState: IInitState = {
    page: 1,
    sort: "",
    filters: {},
    filtersData: [],
    cardType: "plate",
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState: initialState,
    reducers: {
        // set page card type in catalog
        setCardType: (state, action) => {
            state.cardType = action.payload;
        },

        // set filters data
        setFiltersData: (state, action) => {
            state.filtersData = action.payload;
        },

        // set checked filters
        setFilters: (state, action) => {
            state.filters = action.payload;
        },

        // set active page
        setPage: (state, action) => {
            state.page = action.payload;
        },

        // set active sort
        setSort: (state, action) => {
            state.sort = action.payload;
        },
    },
});

export function refetchFilters(checkedFilters: ICheckedParams){
    return async function(dispatch: AppDispatch, getState: () => Store) {
        const { sort } = getState().catalog;
        const path = window.location.pathname.replace("/catalog/", "");
        const result = await fetchCatalogFilters(path, { params: checkedFilters });
        const verifiedFilters = new FilterService(result).getVerifiedQueryFilters(checkedFilters);

        paramsService.setParamsObject({
            page: 1,
            sort,
            ...verifiedFilters
        });

        await dispatch(setFilters(verifiedFilters));
        await dispatch(setFiltersData(result));
    };
}

export const {
    setPage,
    setSort,
    setFilters,
    setFiltersData,
    setCardType,
} = catalogSlice.actions;

export default catalogSlice.reducer;
