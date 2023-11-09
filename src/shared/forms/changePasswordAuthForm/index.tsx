import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import profileService from "@/services/profileService";
import FormContainer from "@/shared/containers/formContainer";
import { 
    CHANGE_PASSWORD_AUTH_FORM_DATA,
    INIT_FORM_DATA 
} from "@/shared/forms/changePasswordAuthForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TAuthChangePassword } from "@/types/profile";
import { AUTH_CHANGE_PASSWORD_SCHEMA } from "@/utils/schemas";

const ChangePasswordAuthForm: FC = () => {
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TAuthChangePassword>({
        resolver: yupResolver(AUTH_CHANGE_PASSWORD_SCHEMA),
    });

    async function onSubmit(userData: TAuthChangePassword) {
        const { status, data } = await profileService.changePassword(userData);

        if (status === 200) {
            await setSuccess(data.message);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }

    function renderChangePasswordFields() {
        return CHANGE_PASSWORD_AUTH_FORM_DATA.map(data => {
            const { name, placeholder, type } = data;

            return (
                <DefaultInputControlled 
                    key={name}
                    control={control}
                    defaultValue={""}
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
            message={message}
        >
            <form
                className={"flex flex-col gap-[16px] w-full md:max-w-[412px]"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderChangePasswordFields()}
                <DefaultButton>Изменить пароль</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default ChangePasswordAuthForm;