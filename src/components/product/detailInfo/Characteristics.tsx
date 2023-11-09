import { FC } from "react";

import useProductDetailData from "@/hooks/api/useProductDetailData";
import Interceptor from "@/shared/interceptor";

const Characteristics: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();
    
    function renderCharacteristics() {
        return data?.detailInfo.characteristics.map(characteristic => {
            const { id, value, name } = characteristic;
            
            return (
                <li key={id} className={"flex gap-[54px]"}>
                    <p className={"w-[100px] lg:w-[200px] text-sm lg:text-[16px] text-cyanBlueCool"}>{name}</p>
                    <p className={"text-sm lg:text-[16px] text-cyanBlueGray"}>{value}</p>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить характеристику товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {!data?.detailInfo?.characteristics ? (
                <div>Нет характеристик</div>
            ) : (
                <ul className={"flex flex-col gap-[12px] w-full"}>
                    {renderCharacteristics()}
                </ul>
            )}
        </Interceptor>
    );
};

export default Characteristics;