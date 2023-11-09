import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { LEGAL_ENTITY_FORM_DATA } from "@/shared/forms/legalEntityForm/constants";
import { TLegalEntity } from "@/shared/forms/legalEntityForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import { setCustomer } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PERSONAL_TYPE } from "@/types/profile";
import { LEGAL_ENTITY_SCHEMA } from "@/utils/schemas";

interface ILegalEntityForm {
    onSubmit: () => void;
}

const LegalEntityForm: FC<ILegalEntityForm> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(({ user }) => user.data);
    const customer = useAppSelector(({ basket }) => basket.sections.customer);
    const { handleSubmit, control, formState: { errors }, reset } = useForm<TLegalEntity>({
        resolver: yupResolver(LEGAL_ENTITY_SCHEMA),
    });

    useEffect(() => {
        if (customer.customerType === PERSONAL_TYPE.legal) {
            const customerData = {
                ...user,
                company: "",
                inn: "",
                kpp: ""
            };

            reset(customerData);
            dispatch(setCustomer({
                ...customer,
                customerData,
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
        return LEGAL_ENTITY_FORM_DATA.map(data => {
            const { name, placeholder, mask, min, max } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    errorMessage={errors[name]?.message ?? ""}
                    isError={!!errors[name]?.message}
                    mask={mask}
                    max={max}
                    min={min}
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

export default LegalEntityForm;
