import { FC } from "react";

import CircleSwitcher from "@/shared/UI/switcher/circleSwitcher";
import { setPayment } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { PAYMENT_CHECK_TYPE } from "@/types/basket";

const checkData = [
    {
        id: PAYMENT_CHECK_TYPE.email,
        title: "Отправить чек на электронную почту",
        name: "checkType",
    },
    {
        id: PAYMENT_CHECK_TYPE.sms,
        title: "Отправить чек по СМС",
        name: "checkType",
    }
];

const Cheque: FC = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(({ basket }) => basket.sections.payment);

    function onChange(id: string) {
        dispatch(setPayment({
            ...payment,
            paymentData: {
                ...payment.paymentData,
                checkType: id,
            }
        }));
    }

    function renderSendingType() {
        return checkData.map(data => {
            const { id, name, title } = data;

            return (
                <CircleSwitcher
                    key={id}
                    id={id}
                    isChecked={payment.paymentData.checkType === id}
                    name={name}
                    title={title}
                    onChange={onChange}
                />
            );
        });
    }

    return (
        <div className={"flex flex-col md:flex-row gap-[16px]"}>
            {renderSendingType()}
        </div>
    );
};

export default Cheque;
