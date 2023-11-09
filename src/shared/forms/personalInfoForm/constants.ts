import { TPersonalInfoFields } from "@/shared/forms/personalInfoForm/types";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";

export const PERSONAL_INFO_FORM_DATA: {
    name: TPersonalInfoFields;
    mask?: string;
    placeholder: string;
}[] = [
    {
        name: NAME_FIELDS.firstName,
        placeholder: PLACEHOLDER_FIELDS.firstNameReq
    },
    {
        name: NAME_FIELDS.email,
        placeholder: PLACEHOLDER_FIELDS.email
    },
    {
        name: NAME_FIELDS.lastName,
        placeholder: PLACEHOLDER_FIELDS.lastNameReq
    },
    {
        name: NAME_FIELDS.phone,
        placeholder: PLACEHOLDER_FIELDS.phone,
        mask: "+7 (999) 999-99-99"
    }
];