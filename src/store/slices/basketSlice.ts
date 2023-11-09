import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProductConverter } from "@/types";
import {
    IBasketInfo,
    IBasketPayment,
    IBasketStatistics,
    PAYMENT_CHECK_TYPE,
} from "@/types/basket";
import { PERSONAL_TYPE } from "@/types/profile";
import getMinDate from "@/utils/getMinDate";

interface ISectionState {
    isActive: boolean;
    position: {
        x: number;
        y: number;
    }
}

type TSections = "basket" | "shipping" | "customer" | "payment";

type TSectionState = {
    [section in TSections as string]: ISectionState;
}

interface IInitState {
    products: IProductConverter[];
    info: IBasketStatistics;
    sectionsState: TSectionState
    sections: IBasketPayment;
}

const initialState: IInitState = {
    products: [],
    info: {
        weight: 0,
        volume: 0,
        fullPrice: 0,
        count: 0,
    },
    sectionsState: {
        basket: {
            isActive: true,
            position: {
                x: 0,
                y: 0,
            },
        },
        shipping: {
            isActive: false,
            position: {
                x: 0,
                y: 0,
            },
        },
        customer: {
            isActive: false,
            position: {
                x: 0,
                y: 0,
            },
        },
        payment: {
            isActive: false,
            position: {
                x: 0,
                y: 0,
            },
        },
    },
    sections: {
        shipping: {
            shippingId: "",
            shippingData: {
                city: "",
                street: "",
                house: "",
                apartment: "",
                message: "",
                date: getMinDate(1).date,
                latitude: 0,
                longitude: 0,
            }
        },
        customer: {
            customerType: PERSONAL_TYPE.personal,
            customerData: {
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                company: "",
                inn: "",
                kpp: ""
            }
        },
        payment: {
            paymentId: "",
            paymentData: {
                message: "",
                checkType: PAYMENT_CHECK_TYPE.email
            }
        },
    }
};

const basketSlice = createSlice({
    name: "basket",
    initialState: initialState,
    reducers: {
        setBasket: (state, action: PayloadAction<IBasketInfo>) => {
            const { products, info } = action.payload;

            state.info = info;
            state.products = products;
        },
        setSectionsActive: (state, action) => {
            state.sectionsState = Object.entries(state.sectionsState).reduce((acc, [key, value]) => {
                return {
                    ...acc,
                    [key]: {
                        ...value,
                        isActive: key === action.payload,
                    }
                };
            }, {});
        },
        setSectionsState: (state, action) => {
            state.sectionsState = action.payload;
        },
        setShippingId: (state, action) => {
            state.sections.shipping.shippingId = action.payload;
        },
        setShippingData: (state, action) => {
            state.sections.shipping.shippingData = action.payload;
        },
        setCustomer: (state, action) => {
            state.sections.customer = action.payload;
        },
        setPayment: (state, action) => {
            state.sections.payment = action.payload;
        }
    },
});

export const {
    setBasket,
    setSectionsState,
    setSectionsActive,
    setShippingId,
    setShippingData,
    setCustomer,
    setPayment,
} = basketSlice.actions;

export default basketSlice.reducer;
