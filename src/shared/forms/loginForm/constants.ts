import { ROUTES } from "@/routes";
import { TInput } from "@/shared/UI/inputs/types";
import { TLoginFields } from "@/types/auth";
import { NAME_FIELDS } from "@/types/forms";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.email]: "",
    [NAME_FIELDS.password]: "",
};

export const LOGIN_FORM_DATA: {
    name: TLoginFields;
    placeholder: string;
    type: TInput;
}[] = [
    {
        name: NAME_FIELDS.email,
        placeholder: "Почта*",
        type: "text"
    },
    {
        name: NAME_FIELDS.password,
        placeholder: "Пароль*",
        type: "password"
    }
];

export const FORM_LINKS = [
    {
        id: "reg",
        href: ROUTES.registration,
        title: "Зарегистрироваться"
    },
    {
        id: "change-password",
        href: ROUTES.changePassword,
        title: "Забыли пароль?"
    }
];