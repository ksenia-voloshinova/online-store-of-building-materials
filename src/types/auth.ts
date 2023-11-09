import { ITokens } from "@/types/index";

import { NAME_FIELDS } from "./forms";

export type TRegistrFields = NAME_FIELDS.firstName | NAME_FIELDS.lastName | 
    NAME_FIELDS.email | NAME_FIELDS.password | NAME_FIELDS.confirmPassword;

export type TRegistrConfirmFields = NAME_FIELDS.email;

export type TLoginFields = NAME_FIELDS.email | NAME_FIELDS.password;

export type TConfirmChangePasswordFields = NAME_FIELDS.email | NAME_FIELDS.password 
    | NAME_FIELDS.confirmPassword;

export type TRegistration = {
    [name in TRegistrFields]: string;
}

export type TConfirmRegistration = {
    [name in TRegistrConfirmFields]: string;
}

export interface IConfirmRegistrationReq extends TConfirmRegistration {
    [NAME_FIELDS.code]: string;
}

export type TLogin = {
    [name in TLoginFields]: string;
}

export type TChangePassword = {
    [NAME_FIELDS.email]: string;
}

export type TConfirmChangePassword = {
    [name in TConfirmChangePasswordFields]: string;
}

export interface IConfirmChangePasswordReq extends TConfirmChangePassword {
    [NAME_FIELDS.code]: string;
}

export interface ILoginResp {
    message: string;
    data: ITokens;
}

export interface IRefreshResp {
    message: string;
    data: ITokens;
}