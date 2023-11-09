import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import authService from "@/services/authService";
import FormContainer from "@/shared/containers/formContainer";
import { 
    FORM_LINKS,
    INIT_FORM_DATA,
    REGISTRATION_FORM_DATA
} from "@/shared/forms/registrationForm/constants";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { TRegistration } from "@/types/auth";
import { REGISTRATION_SCHEMA } from "@/utils/schemas";

const RegistrationForm = () => {
    const { isError, isSuccess, setSuccess, setError, message } = useFormState();
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TRegistration>({
        resolver: yupResolver(REGISTRATION_SCHEMA),
    });

    async function onSubmit(userData: TRegistration) {
        const { firstName, lastName, email, password, confirmPassword } = userData;
        const { status, data } = await authService.registration({
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            email,
            password,
            confirmPassword,
        });

        if (status === 200) {
            await setSuccess(data.message);
            reset(INIT_FORM_DATA);
        } else {
            await setError(data.message);
        }
    }

    function renderRegFields() {
        return REGISTRATION_FORM_DATA.map(data => {
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
            links={FORM_LINKS}
            message={message}
            title={"Регистрация"}
        >
            <form
                className={"flex flex-col gap-[16px]"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderRegFields()}
                <DefaultButton>Зарегистрироваться</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default RegistrationForm;