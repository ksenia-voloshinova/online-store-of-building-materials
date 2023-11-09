import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { PERSONAL_INFO_FORM_DATA } from "@/shared/forms/personalInfoBasketForm/constants";
import { TPersonalInfo } from "@/shared/forms/personalInfoBasketForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { setCustomer } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PERSONAL_TYPE } from "@/types/profile";
import { PERSONAL_INFO_SCHEMA } from "@/utils/schemas";

interface IPersonalInfoBasketForm {
    onSubmit: () => void;
}

const PersonalInfoBasketForm: FC<IPersonalInfoBasketForm> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(({ user }) => user.data);
    const customer = useAppSelector(({ basket }) => basket.sections.customer);
    const { handleSubmit, control, reset, formState: { errors } } = useForm<TPersonalInfo>({
        resolver: yupResolver(PERSONAL_INFO_SCHEMA),
    });

    useEffect(() => {
        if (customer.customerType === PERSONAL_TYPE.personal) {
            reset(user);

            dispatch(setCustomer({
                ...customer,
                customerData: user
            }));
        }
    }, [user, customer.customerType]);

    function onInput(name: string, value: string) {
        dispatch(setCustomer({
            ...customer,
            customerData: {
                ...customer.customerData,
                [name]: value
            }
        }));
    }

    function renderLoginFields() {
        return PERSONAL_INFO_FORM_DATA.map(data => {
            const { name, placeholder, mask } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    defaultValue={customer.customerData[name]}
                    errorMessage={errors[name]?.message ?? ""}
                    isError={!!errors[name]?.message}
                    mask={mask}
                    name={name}
                    placeholder={placeholder}
                    onInput={onInput}
                />
            );
        });
    }

    return (
        <form className={"flex flex-col gap-[24px] w-full md:max-w-[850px]"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-[24px]"}>
                {renderLoginFields()}
            </div>
            <DefaultButton>Перейти к оплате</DefaultButton>
        </form>
    );
};

export default PersonalInfoBasketForm;
