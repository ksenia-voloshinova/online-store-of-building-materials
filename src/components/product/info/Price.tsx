import { FC } from "react";

import { RUB } from "@/utils/constants";

interface IPrice {
    basePrice: number;
    isSalable: boolean;
}

const Price: FC<IPrice> = ({ basePrice, isSalable }) => {
    return (
        <p className={"mt-[12px] text-[32px] " +
            "sm:text-[36px] md:text-[42px] lg:text-[56px] 2xl:text-[64px] font-bold"}
        >
            {isSalable ? basePrice : "-"} {RUB}
        </p>
    );
};

export default Price;
