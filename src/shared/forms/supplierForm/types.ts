import { NAME_FIELDS } from "@/types/forms";

export type TSuppliersFields = NAME_FIELDS.fullName | NAME_FIELDS.position | NAME_FIELDS.company
    | NAME_FIELDS.phone | NAME_FIELDS.message | NAME_FIELDS.agreement;

export type TSuppliers = {
    [NAME_FIELDS.fullName]: string;
    [NAME_FIELDS.position]: string;
    [NAME_FIELDS.company]: string;
    [NAME_FIELDS.phone]: string;
    [NAME_FIELDS.message]: string;
    [NAME_FIELDS.agreement]: boolean;
}