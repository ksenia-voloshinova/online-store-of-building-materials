import { FC } from "react";

import AdditionalInfo from "@/components/product/additionalInfo";
import BreadcrumbsProduct from "@/components/product/breadcrumbsProduct";
import CrossSale from "@/components/product/crossSale";
import DetailInfo from "@/components/product/detailInfo";
import Info from "@/components/product/info";
import Recommendation from "@/components/product/recommendation";
import Viewed from "@/components/product/viewed";

const Product: FC = () => {
    return (
        <div className={"container-width mb-[41px]"}>
            <BreadcrumbsProduct />
            <Info />
            <DetailInfo />
            <CrossSale />
            <Recommendation />
            <Viewed />
            <AdditionalInfo />
        </div>
    );
};

export default Product;
