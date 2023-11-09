import { FC } from "react";

import Rate from "@/shared/rate";

interface IRating {
    rate: number;
}

const Rating: FC<IRating> = ({ rate }) => {
    return (
        <div className={"flex items-center gap-[10px]"}>
            <Rate rate={rate} spacing={2} />
            <p className={"text-sm md:text-[16px]"}>{rate}</p>
        </div>
    );
};

export default Rating;