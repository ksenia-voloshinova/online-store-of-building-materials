import usePromotionsData from "@/hooks/api/usePromotionsData";
import Interceptor from "@/shared/interceptor";
import Promotions from "@/shared/promotions";

const PromotionsCatalog = () => {
    const { isLoading, isFetching, isError, data } = usePromotionsData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить промоакции"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <Promotions promotions={data ?? []} />
        </Interceptor>
    );
};

export default PromotionsCatalog;