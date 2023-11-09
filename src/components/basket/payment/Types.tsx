import { FC, useEffect } from "react";

import usePaymentTypes from "@/hooks/api/usePaymentTypes";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import CircleSwitcher from "@/shared/UI/switcher/circleSwitcher";
import { setPayment } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Types: FC = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(({ basket }) => basket.sections.payment);
    const { isLoading, isFetching, isError, data } = usePaymentTypes();

    useEffect(() => {
        if (!data) return;

        onChange(data[0].uuid);
    }, [data]);

    function onChange(uuid: string) {
        dispatch(setPayment({
            ...payment,
            paymentId: uuid,
        }));
    }

    function renderTypes() {
        return data?.map(d => {
            const { uuid, name } = d;

            return (
                <CircleSwitcher
                    key={uuid}
                    id={uuid}
                    isChecked={uuid === payment.paymentId}
                    name={"paymentId"}
                    title={name}
                    onChange={onChange}
                />
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить варианты оплаты"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex flex-col md:flex-row gap-[16px]"}>
                {renderTypes()}
            </div>
        </Interceptor>
    );
};

export default Types;
