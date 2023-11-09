import { NAME_FIELDS } from "@/types/forms";

export type TPersonalInfoFields = NAME_FIELDS.firstName | NAME_FIELDS.lastName | NAME_FIELDS.email | NAME_FIELDS.phone;

export type TPersonalInfo = {
    [name in TPersonalInfoFields]: string;
}
