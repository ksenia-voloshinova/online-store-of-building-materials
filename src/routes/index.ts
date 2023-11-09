// все роуты
export enum ROUTES {
    error404 = "/404/",
    error500 = "/500/",
    basket = "/basket/",
    compare = "/compare/",
    favorite = "/favorites/",
    lk = "/lk/",
    personalInfo = "/lk/personal-info/",
    addresses = "/lk/addresses/",
    orders = "/lk/orders/",
    login = "/lk/login/",
    registration = "/lk/registration/",
    confirmRegistration = "/lk/registration-confirm",
    changePassword = "/lk/change-password/",
    confirmChangePassword = "/lk/change-password-confirm/",
    confirmChangeEmail = "/lk/change-email-confirm/",
    catalog = "/catalog/",
    contacts = "/contacts/"
}

// доступны только авторизованным пользователям
export enum PRIVATE_ROUTES {
    lk = "/lk/",
    personalInfo = "/lk/personal-info/",
    addresses = "/lk/addresses/",
    orders = "/lk/orders/",
}

// доступны только неавторизованным пользователям
export enum PUBLIC_ROUTES {
    login = "/lk/login/",
    registration = "/lk/registration/",
    confirmRegistration = "/lk/registration-confirm/",
    confirmChangePassword = "/lk/change-password-confirm/",
}
