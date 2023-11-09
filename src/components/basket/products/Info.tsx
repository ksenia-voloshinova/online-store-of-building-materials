import { FC } from "react";

import { useAppSelector } from "@/store/store";
import { RUB } from "@/utils/constants";

const Info: FC = () => {
    const basketInfo = useAppSelector(({ basket }) => basket.info);

    return (
        <div className={"mb-[50px] flex gap-[20px] justify-between"}>
            <p>Вес и объем товаров в заказе, {basketInfo.weight} тонн, {basketInfo.volume} м³</p>
            <div>
                <p>Итого к оплате</p>
                <p className={"whitespace-nowrap font-bold text-right text-[22px]"}>
                    {(basketInfo.fullPrice).toFixed(2)} {RUB}
                </p>
            </div>
        </div>
    );
};

export default Info;
