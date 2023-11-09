import { FC } from "react";

import { RUB } from "@/utils/constants";

interface IPrice {
    isSale: boolean;
    salePrice: number;
    isSalable: boolean;
    basePrice: number;
}

const Price: FC<IPrice> = ({ basePrice, salePrice, isSale, isSalable }) => {
    return (
        <p className={"whitespace-nowrap text-xl lg:text-[24px] text-blueMagentaDark font-bold duration-[400ms]"}>
            {isSalable && (
                <>{isSale ? salePrice : (basePrice ?? "-")} {RUB}</>
            )}
        </p>
    );
};

export default Price;
