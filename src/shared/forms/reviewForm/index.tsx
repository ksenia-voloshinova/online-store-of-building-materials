import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import reviewService from "@/services/reviewService";
import FormContainer from "@/shared/containers/formContainer";
import { IReviewForm, TReviewForm } from "@/shared/forms/reviewForm/types";
import Rate from "@/shared/rate";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import DefaultTextareaControlled from "@/shared/UI/textareas/defaultTextareaControll";
import { useAppSelector } from "@/store/store";
import { NAME_FIELDS } from "@/types/forms";
import { REVIEW_SCHEMA } from "@/utils/schemas";

const ReviewForm: FC<IReviewForm> = ({ onSubmit, uuid }) => {
    const userData = useAppSelector(({ user }) => user.data);
    const { isError, isSuccess, setError, message, setSuccess } = useFormState();
    const { handleSubmit, control, formState: { errors }, setValue } = useForm<TReviewForm>({
        resolver: yupResolver(REVIEW_SCHEMA),
    });

    async function onSubmitForm(reviewData: TReviewForm) {
        const { status, message, data } = await reviewService.createReview(uuid, {
            ...reviewData,
            rate: +reviewData.rate,
        });

        if (status === 200) {
            await setSuccess(message);

            if (data) onSubmit(data);
        } else {
            await setError(message);
        }
    }

    function onChangeRating(rate: number) {
        setValue(NAME_FIELDS.rate, rate.toString(), {
            shouldValidate: true,
        });
    }

    return (
        <div>
            {isSuccess ? (
                <p className={"text-lg-bold"}>{message}</p>
            ) : (
                <FormContainer
                    isError={isError}
                    message={message}
                    title={""}
                >
                    <form className={"flex flex-col gap-[24px]"} onSubmit={handleSubmit(onSubmitForm)}>
                        <div className={"flex flex-col gap-[5px]"}>
                            <div className={"flex items-center gap-[10px]"}>
                                <p className={"text-sm lg:text-[16px]"}>Ваша оценка*:</p>
                                <Rate isDisabled={false} rate={0} onChange={onChangeRating} />
                                <div className={"hidden"}>
                                    <DefaultInputControlled
                                        control={control}
                                        errorMessage={errors[NAME_FIELDS.rate]?.message ?? ""}
                                        name={NAME_FIELDS.rate}
                                    />
                                </div>
                            </div>
                            <p className={"text-red text-xs lg:text-sm"}>
                                {errors[NAME_FIELDS.rate]?.message ?? ""}
                            </p>
                        </div>
                        <div className={"flex flex-col md:flex-row justify-between gap-[24px]"}>
                            <DefaultInputControlled
                                control={control}
                                errorMessage={errors[NAME_FIELDS.fullName]?.message ?? ""}
                                isError={!!errors[NAME_FIELDS.fullName]?.message}
                                name={NAME_FIELDS.fullName}
                                placeholder={"Имя*"}
                            />
                            <DefaultInputControlled
                                control={control}
                                defaultValue={userData.email}
                                errorMessage={errors[NAME_FIELDS.email]?.message ?? ""}
                                isError={!!errors[NAME_FIELDS.email]?.message}
                                name={NAME_FIELDS.email}
                                placeholder={"Почта*"}
                            />
                        </div>
                        <DefaultTextareaControlled
                            control={control}
                            errorMessage={errors[NAME_FIELDS.review]?.message ?? ""}
                            name={NAME_FIELDS.review}
                            placeholder={"Отзыв"}
                        />
                        <DefaultButton>ОТПРАВИТЬ</DefaultButton>
                    </form>
                </FormContainer>
            )}
        </div>
    );
};

export default ReviewForm;
