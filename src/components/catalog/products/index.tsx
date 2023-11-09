import { FC } from "react";

import useCatalogData from "@/hooks/api/useCatalogData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import ProductCardList from "@/shared/productCard/productCardList";
import ProductCardPlate from "@/shared/productCard/productCardPlate";
import { useAppSelector } from "@/store/store";

const Products: FC = () => {
    const { isLoading, isFetching, isError, data: catalog } = useCatalogData();
    const cardType = useAppSelector(({ catalog }) => catalog.cardType);

    function renderProducts() {
        return catalog?.products.map(product => {
            return (
                <li key={product.id} className={"w-full sm:w-[328px] md:w-[350px] lg:w-[328px]"}>
                    {cardType === "plate" ? (
                        <ProductCardPlate productData={product} />
                    ) : (
                        <ProductCardList productData={product} />
                    )}
                </li>
            );
        });
    }

    return (
        <div className={"mb-[35px]"}>
            <Interceptor
                errorMessage={"Не удалось загрузить товары"}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                loader={<Loader height={150} width={150} />}
            >
                <ul className={"mt-[20px] flex flex-wrap gap-[17px]"}>
                    {renderProducts()}
                </ul>
            </Interceptor>
        </div>
    );
};

export default Products;
