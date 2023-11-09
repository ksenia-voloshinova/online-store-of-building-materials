import { FC, useEffect } from "react";

import useShippingTypes from "@/hooks/api/useShippingTypes";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import CircleSwitcher from "@/shared/UI/switcher/circleSwitcher";
import { setShippingId } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TShippingType } from "@/types/basket";

interface ITypes {
    onChangeShippingCode: (code: TShippingType) => void;
}

const Types: FC<ITypes> = ({ onChangeShippingCode }) => {
    const dispatch = useAppDispatch();
    const shipping = useAppSelector(({ basket }) => basket.sections.shipping);
    const { isLoading, isFetching, isError, data } = useShippingTypes();

    useEffect(() => {
        if (!data) return;

        onChange(data[0].uuid, data[0].code);
    }, [data]);

    function onChange(uuid: string, code: TShippingType) {
        dispatch(setShippingId(uuid));
        onChangeShippingCode(code);
    }

    function renderShippingTypes() {
        return data?.map(d => {
            const { uuid, name, code } = d;

            return (
                <CircleSwitcher
                    key={uuid}
                    id={uuid}
                    isChecked={uuid === shipping.shippingId}
                    name={"shippingType"}
                    title={name}
                    onChange={(uuid) => onChange(uuid, code)}
                />
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить типы доставки"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex flex-col md:flex-row gap-[16px]"}>
                {renderShippingTypes()}
            </div>
        </Interceptor>
    );
};

export default Types;
