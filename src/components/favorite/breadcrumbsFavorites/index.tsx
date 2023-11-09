import { FC } from "react";

import { ROUTES } from "@/routes";
import Breadcrumbs from "@/shared/breadcrumbs";
import { BASE_DOMAIN } from "@/utils/constants";

const BreadcrumbsFavorites: FC = () => {
    const breadcrumbs = [
        {
            id: 1,
            title: "Главная",
            link: BASE_DOMAIN,
        },
        {
            id: 2,
            title: "Избранное",
            link: ROUTES.favorite,
        }
    ];

    return (
        <div className={"mt-[25px]"}>
            <Breadcrumbs data={breadcrumbs} />
        </div>
    );
};

export default BreadcrumbsFavorites;
