import { FC } from "react";

import useCatalogData from "@/hooks/api/useCatalogData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const ProductsCount: FC = () => {
    const { isLoading, isFetching, isError, data: catalog } = useCatalogData();
    
    return (
        <div className={"w-[200px] max-h-[35px]"}>
            <Interceptor
                errorMessage={"Не удалось загрузить количество найденных товаров"}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                loader={<Loader height={40} width={40} />}
            >
                <p className={"text-[12px] font-bold leading-[15px]"}>
                    Найдено {catalog?.productsCount} товара (-ов)
                </p>
            </Interceptor>
        </div>
    );
};

export default ProductsCount;