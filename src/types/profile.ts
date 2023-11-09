import { NAME_FIELDS } from "@/types/forms";
import { IProduct } from "@/types/index";

export enum PERSONAL_TYPE {
    personal = "personal",
    legal = "legal",
}

export type TAuthChangePasswordFields = NAME_FIELDS.oldPassword | NAME_FIELDS.newPassword
    | NAME_FIELDS.confirmNewPassword;

export type TChangeEmailConfirmFields = NAME_FIELDS.email;

export type TAuthChangePassword = {
    [name in TAuthChangePasswordFields]: string;
}

export type TChangeEmailConfirm = {
    [name in TChangeEmailConfirmFields]: string;
}

export interface IChangeEmailConfirmReq extends TChangeEmailConfirm {
    [NAME_FIELDS.code]: string;
}

export type TPersonalData = PERSONAL_TYPE.personal | PERSONAL_TYPE.legal;

export interface IUserPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface ILegalEntity extends IUserPersonalInfo{
    inn: string;
    kpp: string;
    company: string;
}

export interface IAddress {
    id: string;
    isEdit?: boolean; // for identify edit mode
    isNew?: boolean; // for local addresses that doesn't send to back
    name: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    isDefault: boolean;
    longitude: number;
    latitude: number;
}

export interface IAddressReq {
    name: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    isDefault: boolean;
}

export interface IOrderData {
    pageNumber: number;
    pageCount: number;
    orders: IOrder[];
}

export interface IOrder {
    id: string;
    orderNumber: string;
    datetime: string;
    basePrice: number;
    fullPrice: number;
    status: string;
    statusCode: string;
    actions: {
        canRepeat: boolean;
        canPay: boolean;
        canCancel: boolean;
    },
    payment: {
        link: string;
        status: string;
    },
    items: IProduct[];
}
