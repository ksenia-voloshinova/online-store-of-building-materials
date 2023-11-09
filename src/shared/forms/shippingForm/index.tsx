import "react-datepicker/dist/react-datepicker.css";

import { yupResolver } from "@hookform/resolvers/yup";
import ru from "date-fns/locale/ru";
import { FC, useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";

import { SHIPPING_FORM_DATA } from "@/shared/forms/shippingForm/constants";
import CustomInput from "@/shared/forms/shippingForm/CustomInput";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import DefaultTextareaControlled from "@/shared/UI/textareas/defaultTextareaControll";
import { setShippingData } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TShippingForm } from "@/types/basket";
import { NAME_FIELDS } from "@/types/forms";
import getDate from "@/utils/getDate";
import getDateString from "@/utils/getDateString";
import getMinDate from "@/utils/getMinDate";
import { SHIPPING_SCHEMA } from "@/utils/schemas";
registerLocale("ru", ru);

interface IShippingForm {
    address: TShippingForm;
    onSubmit: () => void;
    onChange: (address: TShippingForm) => void;
    isDisabled?: boolean;
}

const ShippingForm: FC<IShippingForm> = ({ address, onSubmit, onChange, isDisabled= false }) => {
    const dispatch = useAppDispatch();
    const timer = useRef<any>(null);
    const shipping = useAppSelector(({ basket }) => basket.sections.shipping);
    const { handleSubmit, control, reset, formState: { errors }, getValues } = useForm<TShippingForm>({
        resolver: yupResolver(SHIPPING_SCHEMA),
    });
    const [selectedDate, setSelectedDate] = useState<Date>(getMinDate(1).dateString);

    useEffect(() => {
        reset(address);
    }, [address]);

    useEffect(() => {
        if ("date" in shipping.shippingData) {
            setSelectedDate(getDateString(shipping.shippingData.date));
        }
    }, [shipping.shippingData]);

    function showAddressOnTheMap() {
        clearTimeout(timer.current);

        onChange(getValues());
    }

    async function onInput(name: string, value: string) {
        if (name !== NAME_FIELDS.message && name !== NAME_FIELDS.apartment) {
            debouncedTimer();
        }

        await dispatch(setShippingData({
            ...shipping.shippingData,
            [name]: value
        }));
    }

    function debouncedTimer() {
        clearTimeout(timer.current);

        timer.current = setTimeout(function () {
            showAddressOnTheMap();
        }, 3000);
    }

    function onChangeDate(date: Date) {
        setSelectedDate(date);

        dispatch(setShippingData({
            ...shipping.shippingData,
            date: getDate(date)
        }));
    }

    function renderLoginFields() {
        return SHIPPING_FORM_DATA.map(data => {
            const { name, placeholder } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    defaultValue={address[name]}
                    errorMessage={errors[name]?.message ?? ""}
                    isDisabled={isDisabled}
                    isError={!!errors[name]?.message}
                    name={name}
                    placeholder={placeholder}
                    onInput={onInput}
                />
            );
        });
    }

    return (
        <form className={"flex flex-col gap-[24px] w-full"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"flex flex-col items-start gap-[24px]"}>
                {renderLoginFields()}
                <DefaultTextareaControlled
                    control={control}
                    errorMessage={errors[NAME_FIELDS.message]?.message ?? ""}
                    name={NAME_FIELDS.message}
                    placeholder={"Комментарий"}
                    style={"!h-[80px]"}
                    onInput={onInput}
                />
            </div>
            <div className={"relative"}>
                <DatePicker
                    customInput={<CustomInput />}
                    dateFormat={"dd.MM.yyyy"}
                    locale={"ru"}
                    minDate={getMinDate(1).dateString}
                    selected={selectedDate}
                    onChange={onChangeDate}
                />
            </div>
            <DefaultButton>Продолжить</DefaultButton>
        </form>
    );
};

export default ShippingForm;
