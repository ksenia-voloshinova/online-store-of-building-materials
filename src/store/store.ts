import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import basketReducer from "@/store/slices/basketSlice";
import catalogReducer from "@/store/slices/catalogSlice";
import compareReducer from "@/store/slices/compareSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import userReducer from "@/store/slices/userSlice";

const combinedReducer = combineReducers({
    catalog: catalogReducer,
    user: userReducer,
    basket: basketReducer,
    compare: compareReducer,
    favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type HydratedReducer = Reducer<RootState, AnyAction>;

const rootReducer: HydratedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState: RootState = {
            ...state,
            ...action.payload,
        };

        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore: MakeStore<any> = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type Store = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<Store["dispatch"]>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper(makeStore);
