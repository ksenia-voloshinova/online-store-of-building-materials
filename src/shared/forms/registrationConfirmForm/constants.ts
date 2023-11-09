import { ROUTES } from "@/routes";
import { NAME_FIELDS } from "@/types/forms";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.email]: "",
};

export const FORM_LINKS = [
    {
        id: "login",
        href: ROUTES.login,
        title: "Войти"
    },
    {
        id: "changePassword",
        href: ROUTES.changePassword,
        title: "Забыли пароль?"
    },
];