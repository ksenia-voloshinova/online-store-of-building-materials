import { FC } from "react";

import Info from "@/components/favorite/info";
import PrintProducts from "@/components/favorite/printProducts";
import Products from "@/components/favorite/products";
import { useAppSelector } from "@/store/store";

const Content: FC = () => {
    const productsCount = useAppSelector(({ favorites }) => favorites.data.productsCount);

    return (
        <>
            {!!productsCount ? (
                <>
                    <Products />
                    <PrintProducts />
                    <Info />
                </>
            ) : (
                <div>Нет товаров в избранном</div>
            )}
        </>
    );
};

export default Content;
