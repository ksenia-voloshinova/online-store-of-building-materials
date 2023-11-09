import { FC } from "react";

import BreadcrumbsCatalog from "@/components/catalog/breadcrumbsCatalog";
import Content from "@/components/catalog/content";
import PromotionsCatalog from "@/components/catalog/promotionsCatalog";

const Catalog: FC = () => {
    return (
        <div className={"container-width"}>
            <PromotionsCatalog />
            <BreadcrumbsCatalog />
            <Content />
        </div>
    );
};

export default Catalog;
