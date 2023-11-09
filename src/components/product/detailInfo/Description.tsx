import { FC } from "react";

import useProductDetailData from "@/hooks/api/useProductDetailData";
import Interceptor from "@/shared/interceptor";

const Description: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить описание товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {!data?.detailInfo?.description ? (
                <p>Нет описания</p>
            ) : (
                <p
                    className={"text-sm lg:text-[16px]"}
                    dangerouslySetInnerHTML={{ __html: data?.detailInfo?.description ?? "" }}
                />
            )}
        </Interceptor>
    );
};

export default Description;