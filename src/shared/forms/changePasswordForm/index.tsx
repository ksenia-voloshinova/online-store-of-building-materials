import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import authService from "@/services/authService";
import FormContainer from "@/shared/containers/formContainer";
import { FORM_LINKS, INIT_FORM_DATA } from "@/shared/forms/changePasswordForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TChangePassword } from "@/types/auth";
import { NAME_FIELDS, PLACEHOLDER_FIELDS } from "@/types/forms";
import { CHANGE_PASSWORD_SCHEMA } from "@/utils/schemas";

const ChangePasswordForm: FC = () => {
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TChangePassword>({
        resolver: yupResolver(CHANGE_PASSWORD_SCHEMA),
    });

    async function onSubmit(email: TChangePassword) {
        const { status, data } = await authService.changePassword(email);

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
            title={"Восстановление пароля"}
        >
            <form
                className={"flex flex-col gap-[16px]"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <DefaultInputControlled
                    control={control}
                    defaultValue={""}
                    errorMessage={errors[NAME_FIELDS.email]?.message ?? ""}
                    isError={!!errors[NAME_FIELDS.email]?.message}
                    name={NAME_FIELDS.email}
                    placeholder={PLACEHOLDER_FIELDS.email}
                />
                <DefaultButton>Отправить сообщение на почту</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default ChangePasswordForm;