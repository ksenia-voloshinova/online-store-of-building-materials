import { ROUTES } from "@/routes";
import { TInput } from "@/shared/UI/inputs/types";
import { TRegistrFields } from "@/types/auth";
import { NAME_FIELDS } from "@/types/forms";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.firstName]: "",
    [NAME_FIELDS.lastName]: "",
    [NAME_FIELDS.email]: "",
    [NAME_FIELDS.password]: "",
    [NAME_FIELDS.confirmPassword]: "",
};

export const REGISTRATION_FORM_DATA: {
    name: TRegistrFields;
    placeholder: string;
    type: TInput;
}[] = [
    {
        name: NAME_FIELDS.firstName,
        placeholder: "Имя",
        type: "text",
    },
    {
        name: NAME_FIELDS.lastName,
        placeholder: "Фамилия",
        type: "text",
    },
    {
        name: NAME_FIELDS.email,
        placeholder: "Почта*",
        type: "text",
    },
    {
        name: NAME_FIELDS.password,
        placeholder: "Пароль*",
        type: "password",
    },
    {
        name: NAME_FIELDS.confirmPassword,
        placeholder: "Подтверждение пароля*",
        type: "password",
    }
];

export const FORM_LINKS = [
    {
        id: "login",
        href: ROUTES.login,
        title: "Войти"
    },
    {
        id: "change-password",
        href: ROUTES.changePassword,
        title: "Забыли пароль?"
    }
];