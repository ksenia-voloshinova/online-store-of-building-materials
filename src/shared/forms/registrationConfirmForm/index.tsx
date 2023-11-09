import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import { ROUTES } from "@/routes";
import authService from "@/services/authService";
import FormContainer from "@/shared/containers/formContainer";
import {
    FORM_LINKS,
    INIT_FORM_DATA
} from "@/shared/forms/registrationConfirmForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TConfirmRegistration } from "@/types/auth";
import { NAME_FIELDS } from "@/types/forms";
import getValidParam from "@/utils/getValidParam";
import { CONFIRM_REGISTRATION_SCHEMA } from "@/utils/schemas";

const RegistrationConfirmForm: FC = () => {
    const router = useRouter();
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<TConfirmRegistration>({
        resolver: yupResolver(CONFIRM_REGISTRATION_SCHEMA),
    });
    const userEmail = getValidParam(router.query, NAME_FIELDS.email);

    async function onSubmit(userData: TConfirmRegistration) {
        const secureCode = getValidParam(router.query, NAME_FIELDS.code);
        const { status, data } = await authService.confirmRegistration({
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
            links={FORM_LINKS}
            message={message}
            title={"Подверждение регистрации"}
        >
            {isSuccess && (
                <div className={"text-greenWarm"}>
                    Попробуйте <Link href={ROUTES.login}>
                        <span className={"text-greenWarm underline cursor-pointer"}>авторизироваться</span>
                    </Link>
                </div>
            )}
            <form
                className={"flex flex-col gap-[16px]"}
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
                <DefaultButton>Подтвердить регистрацию</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default RegistrationConfirmForm;