import { NAME_FIELDS } from "@/types/forms";
import { IProductConverter } from "@/types/index";
import { ILegalEntity, IUserPersonalInfo, TPersonalData } from "@/types/profile";

export enum PAYMENT_CHECK_TYPE {
    email = "email",
    sms = "sms"
}

export enum SHIPPING_TYPE {
    shipping = "shipping",
    pickup = "pickup"
}

export type TPaymentCheckType = PAYMENT_CHECK_TYPE.email | PAYMENT_CHECK_TYPE.sms;

export type TShippingType = SHIPPING_TYPE.shipping | SHIPPING_TYPE.pickup;

export interface IBasketStatistics {
    weight: number;
    volume: number;
    fullPrice: number;
    count: number;
}

export interface IBasketInfo {
    products: IProductConverter[];
    info: IBasketStatistics;
}

export interface INewBasketProduct {
    id: number;
    count: number;
}

export interface IShipping {
    shippingId: string;
    shippingData: IShippingNewAddress | IShippingAddress | IShippingPickup;
}

export type TShippingFormFields = NAME_FIELDS.city | NAME_FIELDS.street | NAME_FIELDS.house
    | NAME_FIELDS.apartment | NAME_FIELDS.message;

export type TShippingForm = {
    [name in TShippingFormFields]: string;
}

export interface IShippingNewAddress extends TShippingForm {
    longitude: number;
    latitude: number;
    date: string;
}

export interface IShippingAddress {
    id: string;
    message: string;
    longitude: number;
    latitude: number;
    date: string;
}

export interface IShippingPickup {
    shippingAddressId: string;
}

export interface IShippingType {
    uuid: string;
    name: string;
    code: TShippingType;
}

export interface IPickupAddress {
    uuid: string;
    name: string;
    address: string;
    coords: ICoords;
    worktime: string;
    deliveryDate: string;
}

export interface ICoords {
    latitude: number;
    longitude: number;
}

export interface IPayment {
    paymentId: string;
    paymentData: {
        message: string;
        checkType: TPaymentCheckType;
    }
}

export interface IPaymentType {
    uuid: string;
    name: string;
}

export interface ICustomer {
    customerType: TPersonalData;
    customerData: IUserPersonalInfo | ILegalEntity;
}

export interface IBasketPayment {
    shipping: IShipping;
    customer: ICustomer;
    payment: IPayment;
}

export interface INewOrderInfo {
    orderNumber: string;
    email: string;
}
