import { FC } from "react";

import Rate from "@/shared/rate";

interface IRating {
    rate: number;
    isHover: boolean;
}

const Rating: FC<IRating> = ({ rate, isHover }) => {
    return (
        <div className={"flex items-center gap-[10px]"}>
            <Rate rate={rate} ratedColor={`${isHover ? "black" : "#FBB900"}`} spacing={2} />
            <p className={"text-xs lg:text-sm text-blueMagentaDark duration-[400ms]"}>
                {rate}
            </p>
        </div>
    );
};

export default Rating;
