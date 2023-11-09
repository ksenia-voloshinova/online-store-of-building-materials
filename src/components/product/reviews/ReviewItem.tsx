import { FC, useState } from "react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import Photo from "@/components/product/reviews/Photo";
import Reply from "@/components/product/reviews/Reply";
import Rate from "@/shared/rate";
import { IReview } from "@/types/productDetail";

interface IReviewComponent {
    data: IReview
}

const ReviewItem: FC<IReviewComponent> = ({ data }) => {
    const { name, date, rate, photo, review, reply } = data;

    return (
        <div>
            <div className={"flex items-center gap-[16px]"}>
                <Photo name={name} photo={photo} />
                <p className={"text-sm lg:text-[16px] font-bold"}>{name}</p>
                <p className={"text-xs lg:text-[16px]"}>{date}</p>
            </div>
            <div className={"pl-[52px]"}>
                <div className={"lg:mt-[13px] flex items-center gap-[5px]"}>
                    <Rate rate={rate} spacing={2} />
                    <p className={"text-sm lg:text-[16px]"}>{rate}</p>
                </div>
                <p className={`text-sm lg:text-[16px] 
                ${reply && "border-b-1 border-cyanBlueDark pb-[12px] mb-[12px]"}`}
                >
                    {review}
                </p>
                {reply && <Reply reply={reply} />}
            </div>
        </div>
    );
};

export default ReviewItem;