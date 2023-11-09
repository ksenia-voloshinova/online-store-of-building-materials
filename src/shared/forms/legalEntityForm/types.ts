import { NAME_FIELDS } from "@/types/forms";

export type TLegalEntityFields = NAME_FIELDS.firstName | NAME_FIELDS.lastName | NAME_FIELDS.email | NAME_FIELDS.phone |
    NAME_FIELDS.company | NAME_FIELDS.inn | NAME_FIELDS.kpp;

export type TLegalEntity = {
    [name in TLegalEntityFields]: string;
}
