import { NAME_FIELDS } from "@/types/forms";

export type TAddressFields = NAME_FIELDS.addressName | NAME_FIELDS.city | NAME_FIELDS.house | 
    NAME_FIELDS.street | NAME_FIELDS.apartment | NAME_FIELDS.isDefaultAddress;

export type TAddress = {
    [NAME_FIELDS.addressName]: string;
    [NAME_FIELDS.city]: string;
    [NAME_FIELDS.house]: string;
    [NAME_FIELDS.street]: string;
    [NAME_FIELDS.apartment]: string;
    [NAME_FIELDS.isDefaultAddress]: boolean;
}

