import cookies from "js-cookie";

import { ROUTES } from "@/routes";

const userDomain = cookies.get("userDomain");

export const RUB = "₽";

export const BASE_DOMAIN = process.env.NODE_ENV === "development"
    ? `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN}`
    : userDomain
        ? `https://${JSON.parse(process.env.NEXT_PUBLIC_DOMAINS ?? "")[userDomain] ?? process.env.NEXT_PUBLIC_BASE_DOMAIN}`
        : `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;

export const MENU = [
    {
        id: "company",
        target: false,
        title: "Компания",
        link: `${BASE_DOMAIN}/about/`
    },
    {
        id: "suppliers",
        target: false,
        title: "Поставщики",
        link: `${BASE_DOMAIN}/suppliers/`
    },
    {
        id: "products",
        target: false,
        title: "Продукция",
        link: `${BASE_DOMAIN}/products/`
    },
    {
        id: "news",
        target: false,
        title: "Новости",
        link: `${BASE_DOMAIN}/news/`
    },
    {
        id: "career",
        target: false,
        title: "Карьера",
        link: `${BASE_DOMAIN}/career/`
    },
    {
        id: "contacts",
        target: false,
        title: "Контакты",
        link: `${BASE_DOMAIN}/contacts/`
    },
];

export const FOOTER_MENU = [
    ...MENU,
    {
        id: "b2b",
        target: true,
        title: "B2B портал",
        link: "https://b2b.docke.ru/"
    },
    {
        id: "Договор присоединения",
        target: true,
        title: "Договор присоединения",
        link: "/upload/files/Договор присоединения.pdf"
    },
    {
        id: "Приказ",
        target: true,
        title: "Приказ",
        link: "/upload/files/приказ_о_тип_форме_Договора_Присоединения.pdf "
    },
];

export const ACTIONS = [
    {
        type: "fav",
        title: "Избранное",
        link: ROUTES.favorite,
    },
    {
        type: "compare",
        title: "Сравнение",
        link: ROUTES.compare,
    },
    {
        type: "user",
        title: "Кабинет",
        link: ROUTES.lk,
    },
    {
        type: "cart",
        title: "Корзина",
        link: ROUTES.basket,
    }
];
