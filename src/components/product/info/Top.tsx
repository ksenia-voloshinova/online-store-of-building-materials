import { FC } from "react";

import Compare from "@/components/product/info/Compare";
import Favorite from "@/components/product/info/Favorite";
import Rating from "@/components/product/info/Rating";
import Share from "@/components/product/info/Share";
import useProductDetailData from "@/hooks/api/useProductDetailData";

const Top: FC = () => {
    const { data } = useProductDetailData();

    return (
        <div className={"flex flex-col lg:flex-col-reverse gap-[12px]"}>
            <p className={"text-[18px] md:text-[24px] xl:w-9/12 2xl:text-[28px] font-bold"}>
                {data?.title ?? ""}
            </p>
            <div className={"grid grid-cols-2 grid-rows-2 gap-[10px] " +
                "sm:flex sm:items-center lg:justify-between sm:flex-wrap " +
                "md:gap-[20px] lg:gap-[10px] 2xl:gap-[20px] w-full"}
            >
                <Rating rate={data?.rate ?? 0} />
                <Compare elementId={data?.elementId ?? 0} id={data?.id ?? 0} />
                <Share />
                <Favorite id={data?.id ?? 0} />
            </div>
        </div>
    );
};

export default Top;
