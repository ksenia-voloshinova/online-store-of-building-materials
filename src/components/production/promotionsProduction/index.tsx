import { FC } from "react";

import usePromotionsMain from "@/hooks/api/usePromotionsMain";
import Interceptor from "@/shared/interceptor";
import Promotions from "@/shared/promotions";

const PromotionsProduction: FC = () => {
    const { isLoading, isFetching, isError, data } = usePromotionsMain();
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить промоакции"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <div className={"container"}>
                <Promotions promotions={data ?? []} />
            </div>
        </Interceptor>
    );
};

export default PromotionsProduction;