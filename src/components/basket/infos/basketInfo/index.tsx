import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import { useAppSelector } from "@/store/store";
import { RUB } from "@/utils/constants";

const BasketInfo: FC = () => {
    const basketInfo = useAppSelector(({ basket }) => basket.info);

    return (
        <>
            <p>В корзине товаров на сумму: <span className={"whitespace-nowrap font-bold"}>
                {(basketInfo.fullPrice).toFixed(2)} {RUB}
            </span>
            </p>
            <EditIcon className={"min-w-[20px]"} />
        </>
    );
};

export default BasketInfo;
