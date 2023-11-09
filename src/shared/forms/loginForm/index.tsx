import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import { ROUTES } from "@/routes";
import authService from "@/services/authService";
import FormContainer from "@/shared/containers/formContainer";
import { FORM_LINKS, INIT_FORM_DATA, LOGIN_FORM_DATA } from "@/shared/forms/loginForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TLogin } from "@/types/auth";
import { LOGIN_SCHEMA } from "@/utils/schemas";

const LoginForm: FC = () => {
    const router = useRouter();
    const { isError, setError, message, setSuccess } = useFormState();
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TLogin>({
        resolver: yupResolver(LOGIN_SCHEMA),
    });

    async function onSubmit(userData: TLogin) {
        const { status, data } = await authService.login(userData);

        if (status === 200) {
            await setSuccess(data.message);
            await router.push(ROUTES.lk);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }

    function renderLoginFields() {
        return LOGIN_FORM_DATA.map(data => {
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
            links={FORM_LINKS}
            message={message}
            title={"Авторизация"}
        >
            <form
                className={"z-[100] flex flex-col gap-[16px]"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderLoginFields()}
                <DefaultButton>Войти</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default LoginForm;