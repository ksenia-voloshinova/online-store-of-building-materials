import Link from "next/link";
import { FC } from "react";

import { ROUTES } from "@/routes";
import ReviewForm from "@/shared/forms/reviewForm";
import SquareButton from "@/shared/UI/buttons/squareButton";
import { useAppSelector } from "@/store/store";
import { IReview } from "@/types/productDetail";

interface IForm {
    uuid: number;
    addReview: (review: IReview) => void;
}

const Form: FC<IForm> = ({ addReview, uuid }) => {
    const isAuth = useAppSelector(({ user }) => user.isAuth);

    return (
        <>
            {isAuth ? (
                <ReviewForm uuid={uuid} onSubmit={addReview} />
            ) :(
                <Link href={ROUTES.login}>
                    <SquareButton
                        styles={"lg:max-w-[500px] bg-cyanBlueCool text-white text-sm"}
                    >
                        Зарегистрируйтесь, чтобы оставить отзыв
                    </SquareButton>
                </Link>
            )}
        </>
    );
};

export default Form;
