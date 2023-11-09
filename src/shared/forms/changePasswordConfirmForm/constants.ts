import { ROUTES } from "@/routes";
import { TInput } from "@/shared/UI/inputs/types";
import { TConfirmChangePasswordFields } from "@/types/auth";
import { NAME_FIELDS } from "@/types/forms";

export const INIT_FORM_DATA = {
    [NAME_FIELDS.email]: "",
    [NAME_FIELDS.password]: "",
    [NAME_FIELDS.confirmPassword]: ""
};

export const CONFIRM_CHANGE_PASSWORD_FORM_DATA: {
    name: TConfirmChangePasswordFields;
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
    },
    {
        name: NAME_FIELDS.confirmPassword,
        placeholder: "Подтверждение пароля*",
        type: "password"
    }
];

export const FORM_LINKS = [
    {
        id: "login",
        href: ROUTES.login,
        title: "Войти"
    },
    {
        id: "reg",
        href: ROUTES.registration,
        title: "Зарегистрироваться"
    },
];