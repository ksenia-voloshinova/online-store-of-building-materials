import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import favoritesService from "@/services/favoritesService";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { useAppSelector } from "@/store/store";
import { IFavoritesSendEmail } from "@/types/favorite";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";
import { CHANGE_PASSWORD_SCHEMA } from "@/utils/schemas";

interface ISenaFavoritesOnEmail {
    onCancel: () => void;
    onSubmit: (isSuccess: boolean) => void;
}

const SendFavoritesOnEmail: FC<ISenaFavoritesOnEmail> = ({ onSubmit, onCancel }) => {
    const userEmail = useAppSelector(({ user }) => user.data.email);
    const { isError, setError, message } = useFormState();
    const { handleSubmit, control, formState: { errors } } = useForm<IFavoritesSendEmail>({
        resolver: yupResolver(CHANGE_PASSWORD_SCHEMA),
        defaultValues: {
            email: userEmail
        }
    });
    const [isSend, setIsSend] = useState<boolean>(false);

    async function onSubmitForm(emailData: IFavoritesSendEmail) {
        setIsSend(true);
        const { status, data } = await favoritesService.sendFavoritesProductsToEmail(emailData);

        if (status === 200) {
            onSubmit(true);
        } else {
            onSubmit(false);
            setError(data?.message ?? "Произошла ошибка отправки списка избранного на почту. Попробуйте еще раз.");
        }
        setIsSend(false);
    }

    return (
        <form
            className={"flex flex-col gap-[16px]"}
            onSubmit={handleSubmit(onSubmitForm)}
        >
            <p>Введите почту для отправки списка избранных товаров</p>
            {isError && <p className={"text-sm text-red"}>{message}</p>}
            <DefaultInputControlled
                control={control}
                errorMessage={errors[NAME_FIELDS.email]?.message ?? ""}
                isError={!!errors[NAME_FIELDS.email]?.message}
                name={NAME_FIELDS.email}
                placeholder={PLACEHOLDER_FIELDS.email}
            />
            <div className={"flex gap-[8px]"}>
                <DefaultButton
                    isDisabled={isSend}
                >
                    Отправить на почту
                </DefaultButton>
                <DefaultButton
                    styles={"!bg-cyanBlueMiddle !text-white hover:!bg-blueMagenta"}
                    type={"button"}
                    onClick={onCancel}
                >
                    Отменить
                </DefaultButton>
            </div>
        </form>
    );
};

export default SendFavoritesOnEmail;
