import { FC } from "react";

import Buttons from "@/components/catalog/content/Buttons";
import Handles from "@/components/catalog/content/Handles";
import PaginationCatalog from "@/components/catalog/paginationCatalog";
import Products from "@/components/catalog/products";

const Body: FC = () => {
    return (
        <>
            <Handles />
            <Buttons />
            <Products />
            <PaginationCatalog />
        </>
    );
};

export default Body;