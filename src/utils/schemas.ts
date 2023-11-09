import * as yup from "yup";

import { NAME_FIELDS } from "@/types/forms";

export const FULL_NAME_SCHEMA = yup
    .string()
    .required("Заполните поле с именем и фамилией");

export const FIRST_NAME_SCHEMA = yup
    .string()
    .required("Заполните поле с именем");

export const POSITION_NAME_SCHEMA = yup
    .string()
    .required("Заполните поле с должностью");

export const COMPANY_NAME_SCHEMA = yup
    .string()
    .required("Заполните поле с организацией");

export const INN_SCHEMA = yup
    .string()
    .required("Заполните поле с ИИН организации");

export const KPP_SCHEMA = yup
    .string()
    .required("Заполните поле с КПП организации");

export const LAST_NAME_SCHEMA = yup
    .string()
    .required("Заполните поле с фамилией");

export const PHONE_SCHEMA = yup
    .string()
    .required("Заполните поле с номером телефона");

export const EMAIL_SCHEMA = yup
    .string()
    .email("Неверный формат почты");

export const EMAIL_SCHEMA_REQ = yup
    .string()
    .email("Неверный формат почты")
    .required("Заполните поле с почтой");

export const PASSWORD_SCHEMA = yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Заполните поле с паролем");

export const CONFIRM_PASSWORD_SCHEMA = yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Заполните поле с подтверждением пароля");

export const CONFIRM_NEW_PASSWORD_SCHEMA = yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Пароли должны совпадать")
    .required("Заполните поле с подтверждением пароля");

export const ADDRESS_NAME_SCHEMA = yup
    .string()
    .required("Заполните название адреса");

export const CITY_SCHEMA = yup
    .string()
    .required("Заполните поле с городом");

export const STREET_SCHEMA = yup
    .string()
    .required("Заполните поле с улицей");

export const RATE_SCHEMA = yup
    .string()
    .required("Необходимо поставить оценку товару");

export const AGREEMENT_SCHEMA = yup
    .boolean()
    .oneOf([true], "Необходимо согласиться на обработку персонабльных данных");

export const REGISTRATION_SCHEMA = yup.object().shape({
    [NAME_FIELDS.firstName]: yup.string(),
    [NAME_FIELDS.lastName]: yup.string(),
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.password]: PASSWORD_SCHEMA,
    [NAME_FIELDS.confirmPassword]: CONFIRM_PASSWORD_SCHEMA,
});

export const CONFIRM_REGISTRATION_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});

export const LOGIN_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.password]: PASSWORD_SCHEMA,
});

export const CHANGE_PASSWORD_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});

export const SUBSCRIPTION_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});

export const CONFIRM_CHANGE_PASSWORD_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.password]: PASSWORD_SCHEMA,
    [NAME_FIELDS.confirmPassword]: CONFIRM_PASSWORD_SCHEMA,
});

export const AUTH_CHANGE_PASSWORD_SCHEMA = yup.object().shape({
    [NAME_FIELDS.oldPassword]: PASSWORD_SCHEMA,
    [NAME_FIELDS.newPassword]: PASSWORD_SCHEMA,
    [NAME_FIELDS.confirmNewPassword]: CONFIRM_NEW_PASSWORD_SCHEMA,
});

export const AUTH_CHANGE_EMAIL_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});

export const AUTH_CHANGE_EMAIL_CONFIRM_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});

export const REVIEW_SCHEMA = yup.object().shape({
    [NAME_FIELDS.fullName]: FIRST_NAME_SCHEMA,
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.review]: yup.string(),
    [NAME_FIELDS.rate]: RATE_SCHEMA,
});

export const PERSONAL_INFO_SCHEMA = yup.object().shape({
    [NAME_FIELDS.firstName]: FIRST_NAME_SCHEMA,
    [NAME_FIELDS.lastName]: LAST_NAME_SCHEMA,
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.phone]: PHONE_SCHEMA,
});

export const LEGAL_ENTITY_SCHEMA = yup.object().shape({
    [NAME_FIELDS.firstName]: FIRST_NAME_SCHEMA,
    [NAME_FIELDS.lastName]: LAST_NAME_SCHEMA,
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
    [NAME_FIELDS.phone]: PHONE_SCHEMA,
    [NAME_FIELDS.company]: COMPANY_NAME_SCHEMA,
    [NAME_FIELDS.inn]: INN_SCHEMA,
    [NAME_FIELDS.kpp]: KPP_SCHEMA,
});

export const SHIPPING_SCHEMA = yup.object().shape({
    [NAME_FIELDS.city]: CITY_SCHEMA,
    [NAME_FIELDS.street]: STREET_SCHEMA,
    [NAME_FIELDS.house]: yup.string(),
    [NAME_FIELDS.apartment]: yup.string(),
    [NAME_FIELDS.message]: yup.string(),
});

export const ADDRESS_SCHEMA = yup.object().shape({
    [NAME_FIELDS.addressName]: ADDRESS_NAME_SCHEMA,
    [NAME_FIELDS.city]: CITY_SCHEMA,
    [NAME_FIELDS.street]: STREET_SCHEMA,
    [NAME_FIELDS.house]: yup.string(),
    [NAME_FIELDS.apartment]: yup.string(),
    [NAME_FIELDS.isDefaultAddress]: yup.boolean(),
});

export const DEALERS_SCHEMA = yup.object().shape({
    [NAME_FIELDS.fullName]: FULL_NAME_SCHEMA,
    [NAME_FIELDS.position]: POSITION_NAME_SCHEMA,
    [NAME_FIELDS.company]: COMPANY_NAME_SCHEMA,
    [NAME_FIELDS.phone]: PHONE_SCHEMA,
    [NAME_FIELDS.email]: EMAIL_SCHEMA,
    [NAME_FIELDS.message]: yup.string(),
    [NAME_FIELDS.agreement]: AGREEMENT_SCHEMA,
});

export const SUPPLIERS_SCHEMA = yup.object().shape({
    [NAME_FIELDS.fullName]: FULL_NAME_SCHEMA,
    [NAME_FIELDS.position]: POSITION_NAME_SCHEMA,
    [NAME_FIELDS.company]: COMPANY_NAME_SCHEMA,
    [NAME_FIELDS.phone]: PHONE_SCHEMA,
    [NAME_FIELDS.message]: yup.string(),
    [NAME_FIELDS.agreement]: AGREEMENT_SCHEMA,
});

export const SEND_FAV_ON_EMAIL_SCHEMA = yup.object().shape({
    [NAME_FIELDS.email]: EMAIL_SCHEMA_REQ,
});
