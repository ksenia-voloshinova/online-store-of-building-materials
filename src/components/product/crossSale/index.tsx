import { FC } from "react";

import useCrossSaleProducts from "@/hooks/api/useCrossSaleProducts";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import ProductsSlider from "@/shared/productsSlider";

const CrossSale: FC = () => {
    const {
        isLoading,
        isFetching,
        isError,
        data: crossSaleProducts
    } = useCrossSaleProducts();

    return (
        <>
            {crossSaleProducts?.length !== 0 && (
                <Interceptor
                    errorMessage={"Не удалось загрузить рекомендации"}
                    isError={isError}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    loader={<Loader />}
                >
                    <div className={"mt-[40px]"}>
                        <ProductsSlider data={crossSaleProducts ?? []} title={"С этим товаров выбирают"} />
                    </div>
                </Interceptor>
            )}
        </>
    );
};

export default CrossSale;
