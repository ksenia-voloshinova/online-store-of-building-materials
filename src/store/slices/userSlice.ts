import { createSlice } from "@reduxjs/toolkit";

import { IUserPersonalInfo } from "@/types/profile";

interface IInitState {
    isAuth: boolean;
    data: IUserPersonalInfo;
}

const initialState: IInitState = {
    isAuth: false,
    data: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUserInfo: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {
    setIsAuth,
    setUserInfo,
} = userSlice.actions;

export default userSlice.reducer;