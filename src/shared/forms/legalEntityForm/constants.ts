import { TLegalEntityFields } from "@/shared/forms/legalEntityForm/types";
import { PERSONAL_INFO_FORM_DATA } from "@/shared/forms/personalInfoBasketForm/constants";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";

export const LEGAL_ENTITY_FORM_DATA: {
    name: TLegalEntityFields;
    mask?: string;
    min?: number;
    max?: number;
    placeholder: string;
}[] = [
    ...PERSONAL_INFO_FORM_DATA,
    {
        name: NAME_FIELDS.company,
        placeholder: PLACEHOLDER_FIELDS.company
    },
    {
        name: NAME_FIELDS.inn,
        placeholder: PLACEHOLDER_FIELDS.inn,
        mask: "9999999999"
    },
    {
        name: NAME_FIELDS.kpp,
        placeholder: PLACEHOLDER_FIELDS.kpp,
        mask: "999999999",
    },
];
