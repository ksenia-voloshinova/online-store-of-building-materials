import { FC } from "react";

import ReviewItem from "@/components/product/reviews/ReviewItem";
import SquareButton from "@/shared/UI/buttons/squareButton";
import { IReview } from "@/types/productDetail";

interface IReviewList {
    data: IReview[];
    isLastPage: boolean;
    loadReviews: () => void;
}

const ReviewList: FC<IReviewList> = ({ data, isLastPage, loadReviews }) => {
    function renderReviews() {
        return data.map(review => {
            return (
                <li key={review.id}>
                    <ReviewItem data={review}/>
                </li>
            );
        });
    }

    return (
        <>
            {data.length !== 0 ? (
                <div className={"flex flex-col items-center"}>
                    <ul className={"mb-[16px] flex flex-col gap-[20px] w-full"}>
                        {renderReviews()}
                    </ul>
                    {!isLastPage && (
                        <SquareButton
                            styles={"flex justify-center items-center gap-[10px] w-[300px] text-sm lg:text-[16px"}
                            onClick={loadReviews}
                        >
                            Загрузить еще отзывы
                        </SquareButton>
                    )}
                </div>
            ): (
                <div className={`flex justify-center md:min-w-[242px] lg:max-w-[500px] px-[24px] py-[5px] 
                        md:px-[30px] md:py-[10px] text-white text-center text-sm bg-yellowWarm`}
                >
                    Станьте первым, кто оставит отзыв об этом товаре
                </div>
            )}
        </>
    );
};

export default ReviewList;
