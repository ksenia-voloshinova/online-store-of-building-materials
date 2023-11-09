import { TShippingFormFields } from "@/types/basket";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";

export const SHIPPING_FORM_DATA: {
    name: TShippingFormFields;
    placeholder: string;
}[] = [
    {
        name: NAME_FIELDS.city,
        placeholder: PLACEHOLDER_FIELDS.city
    },
    {
        name: NAME_FIELDS.street,
        placeholder: PLACEHOLDER_FIELDS.street
    },
    {
        name: NAME_FIELDS.house,
        placeholder: PLACEHOLDER_FIELDS.house
    },
    {
        name: NAME_FIELDS.apartment,
        placeholder: PLACEHOLDER_FIELDS.apartment,
    }
];
