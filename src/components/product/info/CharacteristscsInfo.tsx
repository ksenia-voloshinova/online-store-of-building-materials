import { FC } from "react";

import useProductDetailData from "@/hooks/api/useProductDetailData";
import Characteristics from "@/shared/characteristics";
import Interceptor from "@/shared/interceptor";

const CharacteristicsInfo: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить характеристики товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <ul className={"mt-[12px] xl:mt-[30px] flex flex-col gap-[8px]"}>
                <Characteristics data={data?.info ?? []} />
            </ul>
        </Interceptor>
    );
};

export default CharacteristicsInfo;
