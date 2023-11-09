import { FC } from "react";

import useRecommendationProducts from "@/hooks/api/useRecommendationProducts";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import ProductsSlider from "@/shared/productsSlider";

const Recommendation: FC = () => {
    const {
        isLoading,
        isFetching,
        isError,
        data: recommendationProducts
    } = useRecommendationProducts();

    return (
        <>
            {recommendationProducts?.length !== 0 && (
                <Interceptor
                    errorMessage={"Не удалось загрузить похожие товары"}
                    isError={isError}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    loader={<Loader />}
                >
                    <div className={"mt-[20px]"}>
                        <ProductsSlider data={recommendationProducts ?? []} title={"Похожие товары"} />
                    </div>
                </Interceptor>
            )}
        </>
    );
};

export default Recommendation;
