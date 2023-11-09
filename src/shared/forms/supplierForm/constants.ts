import { TSuppliersFields } from "@/shared/forms/supplierForm/types";
import { NAME_FIELDS } from "@/types/forms";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.fullName]: "",
    [NAME_FIELDS.position]: "",
    [NAME_FIELDS.company]: "",
    [NAME_FIELDS.phone]: "",
    [NAME_FIELDS.message]: "",
};

export const SUPPLIERS_FORM_DATA: {
    name: TSuppliersFields;
    title: string;
    mask?: string;
}[] = [
    {
        name: NAME_FIELDS.fullName,
        title: "Ваше Имя и Фамилия*"
    },
    {
        name: NAME_FIELDS.position,
        title: "Должность*"
    },
    {
        name: NAME_FIELDS.company,
        title: "Организация*"
    },
    {
        name: NAME_FIELDS.phone,
        title: "Телефон*",
        mask: "+7 (999) 999-99-99",
    },
    {
        name: NAME_FIELDS.message,
        title: "Сообщение (напишите информацию о предлогаемом вами товаре)"
    }
];