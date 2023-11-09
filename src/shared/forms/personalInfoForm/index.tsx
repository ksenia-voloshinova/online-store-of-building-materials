import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import useFormState from "@/hooks/useFormState";
import profileService from "@/services/profileService";
import FormContainer from "@/shared/containers/formContainer";
import { PERSONAL_INFO_FORM_DATA } from "@/shared/forms/personalInfoForm/constants";
import { TPersonalInfo, TPersonalInfoFields } from "@/shared/forms/personalInfoForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { setUserInfo } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PERSONAL_INFO_SCHEMA } from "@/utils/schemas";

const PersonalInfoForm: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(({ user }) => user.data);
    const { isError, isSuccess, setError, message, setSuccess } = useFormState();
    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm<TPersonalInfo>({
        resolver: yupResolver(PERSONAL_INFO_SCHEMA),
    });
    
    useEffect(() => {
        setFormValues();
    },[user]);
    
    function setFormValues() {
        Object.entries(user).forEach(([key, value]) => {
            setValue(key as TPersonalInfoFields, value ?? "");
        });
    }
    
    async function onSubmit(userData: TPersonalInfo) {
        const { status, data } = await profileService.updateUserPersonalInfo(userData);

        if (status === 200) {
            await setSuccess(data.message);
            dispatch(setUserInfo(data.data));
        } else {
            await setError(data.message);
        }
    }

    function renderLoginFields() {
        return PERSONAL_INFO_FORM_DATA.map(data => {
            const { name, placeholder, mask } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    defaultValue={user[name]}
                    errorMessage={errors[name]?.message ?? ""}
                    isError={!!errors[name]?.message}
                    mask={mask}
                    name={name}
                    placeholder={placeholder}
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
            <form className={"flex flex-col gap-[24px] w-full md:max-w-[850px]"} onSubmit={handleSubmit(onSubmit)}>
                <div className={"grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-[24px]"}>
                    {renderLoginFields()}
                </div>
                <DefaultButton>Сохранить</DefaultButton>
            </form>
        </FormContainer>
    );
};

export default PersonalInfoForm;