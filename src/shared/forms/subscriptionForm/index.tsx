import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

import Warning from "@/assets/icons/warn.svg";
import useFormState from "@/hooks/useFormState";
import subscriptionService from "@/services/subscriptionService";
import SquareButton from "@/shared/UI/buttons/squareButton";
import SimpleInputControlled from "@/shared/UI/inputs/simpleInputControlled";
import { NAME_FIELDS } from "@/types/forms";
import { SUBSCRIPTION_SCHEMA } from "@/utils/schemas";

interface ISubscription {
    [NAME_FIELDS.email]: string;
}

const SubscriptionForm: FC = () => {
    const {
        isError,
        setError,
        message,
        setLoading,
        isLoading,
        isSuccess,
        setSuccess
    } = useFormState();
    const { handleSubmit, control, formState: { errors } } = useForm<ISubscription>({
        resolver: yupResolver(SUBSCRIPTION_SCHEMA),
    });

    async function onSubmit(formData: ISubscription) {
        await setLoading(true);

        const {
            status,
            message
        } = await subscriptionService.subscribe(formData[NAME_FIELDS.email]);

        if (status === 200) {
            await setSuccess(message);
        } else {
            await setError(message ?? "Ошибка!");
        }

        await setLoading(false);
    }

    return (
        <div className={"mb-[40px] w-[284px]"}>
            {isSuccess ? (
                <p className={"text-white text-center"}>{message}</p>
            ) : (
                <form
                    className={"flex flex-col justify-between items-center gap-[20px]"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={"relative flex gap-[10px] w-full text-lg-light"}
                    >
                        <p className={"text-lg-light text-white whitespace-nowrap"}>E-mail:</p>
                        <SimpleInputControlled
                            control={control}
                            errorMessage={errors[NAME_FIELDS.email]?.message ?? ""}
                            errorStyle={"text-red text-sm"}
                            name={NAME_FIELDS.email}
                        />
                        {isError && (
                            <div className={"absolute right-[-20px] top-[8px] " +
                                "flex items-center gap-[4px] text-[12px]"}
                            >
                                <Warning />
                            </div>
                        )}
                    </div>
                    <p className={"text-red"}>{message}</p>
                    <SquareButton styles={"!bg-yellowWarm hover:!bg-yellowWarmLight !border-white !text-white"}>
                        {isLoading ? (
                            "Подписка..."
                        ) : (
                            "Подписаться на рассылку"
                        )}
                    </SquareButton>
                </form>
            )}
        </div>
    );
};

export default SubscriptionForm;
