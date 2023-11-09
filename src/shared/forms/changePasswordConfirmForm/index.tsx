import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import authService from "@/services/authService";
import FormContainer from "@/shared/containers/formContainer";
import {
    CONFIRM_CHANGE_PASSWORD_FORM_DATA, FORM_LINKS, 
    INIT_FORM_DATA
} from "@/shared/forms/changePasswordConfirmForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TConfirmChangePassword } from "@/types/auth";
import { NAME_FIELDS } from "@/types/forms";
import getValidParam from "@/utils/getValidParam";
import { CONFIRM_CHANGE_PASSWORD_SCHEMA } from "@/utils/schemas";

const ChangePasswordConfirmForm: FC = () => {
    const router = useRouter();
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const { 
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<TConfirmChangePassword>({
        resolver: yupResolver(CONFIRM_CHANGE_PASSWORD_SCHEMA),
    });

    async function onSubmit(userData: TConfirmChangePassword) {
        const secureCode = getValidParam(router.query, NAME_FIELDS.code);
        const { status, data } = await authService.confirmChangePassword({
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

    function renderChangePasswordConfirmFields() {
        const userEmail = getValidParam(router.query, NAME_FIELDS.email);

        return CONFIRM_CHANGE_PASSWORD_FORM_DATA.map(data => {
            const { name, placeholder, type } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    defaultValue={name === NAME_FIELDS.email ? userEmail : ""}
                    errorMessage={errors[name]?.message ?? ""}
                    isError={!!errors[name]?.message}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                />
            );
        });
    }

    return (
        <FormContainer
            isError={isError}
            isSuccess={isSuccess}
            links={FORM_LINKS}
            message={message}
            title={"Подверждение сброса пароля"}
        >
            <form
                className={"flex flex-col gap-[16px]"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderChangePasswordConfirmFields()}
                <DefaultButton>Обновить пароль</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default ChangePasswordConfirmForm;