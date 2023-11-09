import { NAME_FIELDS } from "@/types/forms";
import { IReview } from "@/types/productDetail";

export type TReviewFields = TReviewInputFields | TReviewTextareaFields;
export type TReviewInputFields = NAME_FIELDS.fullName | NAME_FIELDS.email | NAME_FIELDS.rate;
export type TReviewTextareaFields = NAME_FIELDS.review;

export type TReviewForm = {
    [name in TReviewFields]: string;
}

export interface IReviewForm {
    uuid: number;
    onSubmit: (review: IReview) => void;
}
