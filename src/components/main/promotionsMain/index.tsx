import { FC } from "react";

import usePromotionsMain from "@/hooks/api/usePromotionsMain";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import Promotions from "@/shared/promotions";

const PromotionsMain: FC = () => {
    const { isLoading, isFetching, isError, data } = usePromotionsMain();

    return (
        <div>
            <Interceptor
                errorMessage={"Не удалось загрузить промоакции"}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                loader={<Loader />}
            >
                <div className={"container"}>
                    <Promotions promotions={data ?? []} />
                </div>
            </Interceptor>
        </div>
    );
};

export default PromotionsMain;
