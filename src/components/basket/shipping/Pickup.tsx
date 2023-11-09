import React, { FC, useEffect, useState } from "react";

import usePickupAddresses from "@/hooks/api/usePickupAddresses";
import useWindowSize from "@/hooks/useWindowSize";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import CircleSwitcher from "@/shared/UI/switcher/circleSwitcher";
import YandexMap from "@/shared/yandexMap";
import { IPlacemark } from "@/shared/yandexMap/types";
import { setShippingData } from "@/store/slices/basketSlice";
import { useAppDispatch } from "@/store/store";
import { IPickupAddress } from "@/types/basket";

interface IPickup {
    onSubmit: () => void;
}

const Pickup: FC<IPickup> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const { isLoading, isFetching, isError, data } = usePickupAddresses();
    const [checkedAddress, setCheckedAddress] = useState<IPickupAddress | null>(null);
    const [placemarks, setPlacemarks] = useState<IPlacemark[]>([]);
    const { width } = useWindowSize();
    const [mapSize, setMapSize] = useState({
        width: "600px",
        height: "600px",
    });

    useEffect(() => {
        if (!data) return;

        setCheckedAddress(data[0]);
        onChange(data[0]);
    }, [data]);

    useEffect(() => {
        if (!width) return;

        if (width < 768) {
            setMapSize({
                width: "100%",
                height: "400px"
            });
        } else {
            setMapSize({
                width: "600px",
                height: "600px"
            });
        }
    }, [width]);

    useEffect(() => {
        if (!data) return;

        setPlacemarks(data.reduce<IPlacemark[]>((acc, d) => {
            const { uuid, coords } = d;

            return [...acc, {
                coords,
                isActive: checkedAddress?.uuid === uuid,
            }];
        }, []));
    }, [checkedAddress]);

    function onChange(address: IPickupAddress | undefined) {
        if (!address) return;

        setCheckedAddress(address);

        dispatch(setShippingData({
            shippingAddressId: address.uuid,
        }));
    }

    function renderAddresses() {
        return data?.map(d => {
            const { uuid, name, address, deliveryDate, worktime } = d;

            return (
                <li key={uuid} className={"p-[16px] bg-cyanBlueLight rounded-[8px]"}>
                    <CircleSwitcher
                        id={uuid}
                        isChecked={uuid === checkedAddress?.uuid}
                        name={"pickupAddress"}
                        onChange={(uuid: string) => onChange(data?.find(d => d.uuid === uuid))}
                    >
                        <div className={"flex flex-col gap-[8px] w-full"}>
                            <p>{address}</p>
                            <div className={"flex justify-between items-center gap-[10px]"}>
                                {worktime && <p className={"text-xs"}>{worktime}</p>}
                                {deliveryDate && <p className={"text-xs"}>Доставка: {deliveryDate}</p>}
                            </div>
                        </div>
                    </CircleSwitcher>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить список пунктов самовывоза"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex gap-[24px] flex-col md:flex-row lg:flex-col xl:flex-row"}>
                <ul className={"flex flex-col gap-[8px] w-full md:w-1/2"}>{renderAddresses()}</ul>
                <YandexMap
                    center={data && [data[0].coords.latitude, data[0].coords.longitude]}
                    defaultPlaceMark={false}
                    height={mapSize.height}
                    placemarks={placemarks}
                    width={mapSize.width}
                />
            </div>
            <DefaultButton onClick={onSubmit}>Продолжить</DefaultButton>
        </Interceptor>
    );
};

export default Pickup;
