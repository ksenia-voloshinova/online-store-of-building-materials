import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import Aside from "@/components/lk/aside";
import { ROUTES } from "@/routes";
import Breadcrumbs from "@/shared/breadcrumbs";
import PageTitle from "@/shared/pageTitle";
import { IBreadcrumb } from "@/types";

interface ILkPageContainer {
    title: string;
    children: ReactNode;
}

const initBreadcrumbs: IBreadcrumb[] = [
    {
        id: 1,
        title: "Главная",
        link: "/catalog"
    },
    {
        id: 2,
        title: "Кабинет",
        link: "/lk"
    }
];

const routeBreadcrumbs: {[route: string]: IBreadcrumb[]} = {
    [ROUTES.lk]: initBreadcrumbs,
    [ROUTES.personalInfo]: [...initBreadcrumbs, { id: 3, link: "", title: "Личные данные" }],
    [ROUTES.orders]: [...initBreadcrumbs, { id: 3, link: "", title: "Мои заказы" }],
    [ROUTES.favorite]: [...initBreadcrumbs, { id: 3, link: "", title: "Избранное" }],
    [ROUTES.addresses]: [...initBreadcrumbs, { id: 3, link: "", title: "Мои адреса" }],
    [ROUTES.changePassword]: [...initBreadcrumbs, { id: 3, link: "", title: "Сменить пароль" }],
};

const LkPageContainer: FC<ILkPageContainer> = ({ children, title }) => {
    const router = useRouter();

    return (
        <div className={"container container-width pb-[75px] pt-[25px] " +
            "flex flex-col gap-[25px] h-full bg-desaturatedWhiteWarm"}
        >
            <Breadcrumbs data={routeBreadcrumbs[router.asPath]} />
            <div className={"flex flex-col lg:flex-row gap-[17px] lg:gap-[23px]"}>
                <Aside />
                <div className={"flex flex-col gap-[24px] w-full"}>
                    <PageTitle title={title} />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LkPageContainer;
