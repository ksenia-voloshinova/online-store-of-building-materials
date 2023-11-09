import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import { ROUTES } from "@/routes";
import profileService from "@/services/profileService";
import FormContainer from "@/shared/containers/formContainer";
import { FORM_LINKS, INIT_FORM_DATA } from "@/shared/forms/changeEmailConfirmForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { useAppSelector } from "@/store/store";
import { NAME_FIELDS } from "@/types/forms";
import { TChangeEmailConfirm } from "@/types/profile";
import getValidParam from "@/utils/getValidParam";
import { AUTH_CHANGE_EMAIL_CONFIRM_SCHEMA } from "@/utils/schemas";

const RegistrationConfirmForm: FC = () => {
    const router = useRouter();
    const isAuth = useAppSelector(({ user }) => user.isAuth);
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<TChangeEmailConfirm>({
        resolver: yupResolver(AUTH_CHANGE_EMAIL_CONFIRM_SCHEMA),
    });
    const userEmail = getValidParam(router.query, NAME_FIELDS.email);

    async function onSubmit(userData: TChangeEmailConfirm) {
        const secureCode = getValidParam(router.query, NAME_FIELDS.code);
        const { status, data } = await profileService.confirmChangeEmail({
            ...userData,
            [NAME_FIELDS.code]: secureCode
        });

        if (status === 200) {
            await setSuccess(data.message);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }

    return (
        <FormContainer
            isError={isError}
            isSuccess={isSuccess}
            links={!isAuth ? FORM_LINKS : []}
            message={message}
            title={`${!isAuth ? "Подверждение смены почты" : ""}`}
        >
            {(isSuccess && !isAuth) && (
                <div className={"text-greenWarm"}>
                    Попробуйте <Link href={ROUTES.login}>
                        <span className={"text-greenWarm underline cursor-pointer"}>авторизироваться</span>
                    </Link>
                </div>
            )}
            <form
                className={`flex flex-col gap-[16px] ${isAuth && "z-[100] w-full md:max-w-[412px]"}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <DefaultInputControlled
                    control={control}
                    defaultValue={userEmail ?? ""}
                    errorMessage={errors[NAME_FIELDS.email]?.message ?? ""}
                    isError={!!errors[NAME_FIELDS.email]?.message}
                    name={NAME_FIELDS.email}
                    placeholder={"Почта*"}
                />
                <DefaultButton>Подтвердить смену почты</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default RegistrationConfirmForm;