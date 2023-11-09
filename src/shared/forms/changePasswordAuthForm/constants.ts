import { IInput, TInput } from "@/shared/UI/inputs/types";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";
import { TAuthChangePasswordFields } from "@/types/profile";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.oldPassword]: "",
    [NAME_FIELDS.newPassword]: "",
    [NAME_FIELDS.confirmNewPassword]: ""
};

export const CHANGE_PASSWORD_AUTH_FORM_DATA: {
    name: TAuthChangePasswordFields;
    placeholder: string;
    type: TInput;
}[] = [
    {
        name: NAME_FIELDS.oldPassword,
        placeholder: PLACEHOLDER_FIELDS.oldPassword,
        type: "password"
    },
    {
        name: NAME_FIELDS.newPassword,
        placeholder: PLACEHOLDER_FIELDS.newPassword,
        type: "password"
    },
    {
        name: NAME_FIELDS.confirmNewPassword,
        placeholder: PLACEHOLDER_FIELDS.confirmNewPassword,
        type: "password"
    }
];