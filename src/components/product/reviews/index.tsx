import { FC, useEffect, useState } from "react";

import Form from "@/components/product/reviews/Form";
import ReviewList from "@/components/product/reviews/ReviewList";
import useProductDetailData from "@/hooks/api/useProductDetailData";
import reviewService from "@/services/reviewService";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import { IReview, IReviewGet } from "@/types/productDetail";

const Reviews: FC = () => {
    const { data: detailProduct } = useProductDetailData();
    const [page, setPage] = useState<number>(1);
    const [reviewsData, setReviewsData] = useState<IReviewGet | object>({});
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        loadReviewsOnMount();
    }, []);

    async function loadReviewsOnMount() {
        await getReviews(1);
        await setIsLoading(false);
    }

    async function getReviews(page: number) {
        if (!detailProduct?.id) return;

        const { status, isLastPage, data } = await reviewService.getReviews(detailProduct?.id, page);

        if (status === 200) {
            setIsError(false);

            if (!data) return;

            setReviewsData({
                isLastPage,
                data: "data" in reviewsData ? [...reviewsData.data, ...data] : data
            });
        } else {
            setIsError(true);
        }
    }

    async function loadReviews() {
        setPage(page + 1);
        await getReviews(page + 1);
    }

    function addReview(review: IReview) {
        if ("data" in reviewsData) {
            setReviewsData({
                ...reviewsData,
                data: [review, ...reviewsData.data.slice(0, reviewsData.data.length - 1)]
            });
        }
    }

    return (
        <Interceptor
            errorMessage={"Ошибка загрузки отзывов"}
            isError={isError}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex flex-col gap-[24px]"}>
                <ReviewList
                    data={"data" in reviewsData ? reviewsData.data : []}
                    isLastPage={"isLastPage" in reviewsData ? reviewsData.isLastPage : false}
                    loadReviews={loadReviews}
                />
                <Form addReview={addReview} uuid={detailProduct?.id ?? 0} />
            </div>
        </Interceptor>
    );
};

export default Reviews;
