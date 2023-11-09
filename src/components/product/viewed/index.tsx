import { FC } from "react";

import useViewedProducts from "@/hooks/api/useViewedProducts";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import ProductsSlider from "@/shared/productsSlider";

const Viewed: FC = () => {
    const { isLoading, isFetching, isError, data: viewedProducts } = useViewedProducts();

    return (
        <>
            {viewedProducts?.length !== 0 && (
                <Interceptor
                    errorMessage={"Не удалось загрузить просмотренные товары"}
                    isError={isError}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    loader={<Loader />}
                >
                    <div className={"mt-[20px]"}>
                        <ProductsSlider data={viewedProducts ?? []} title={"Вы недавно просматривали"} />
                    </div>
                </Interceptor>
            )}
        </>
    );
};

export default Viewed;
