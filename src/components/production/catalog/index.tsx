import { FC } from "react";

import BreadcrumbsProduction from "@/components/production/breadcrumbsProduction";
import Products from "@/shared/products";

const Catalog: FC = () => {
    return (
        <div className={"container pt-[15px] md:pt-[20px] flex flex-col 3xl:flex-row " +
            "justify-between gap-[36px] 2xl:gap-[27px]"}>
            <BreadcrumbsProduction />
            <div className={"3xl:w-2/3"}>
                <Products />
            </div>
        </div>
    );
};

export default Catalog;
