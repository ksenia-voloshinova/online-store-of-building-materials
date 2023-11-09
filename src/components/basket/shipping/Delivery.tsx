import React, { FC, useEffect, useState } from "react";

import Select from "@/components/basket/shipping/Select";
import useWindowSize from "@/hooks/useWindowSize";
import ShippingForm from "@/shared/forms/shippingForm";
import YandexMap from "@/shared/yandexMap";
import { setShippingData } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TShippingForm } from "@/types/basket";
import { IAddress } from "@/types/profile";

interface IDelivery {
    onSubmit: () => void;
}

const Delivery: FC<IDelivery> = ({ onSubmit }) => {
    const otherAddress = {
        id: "other",
        name: "Другой адресс",
        city: "",
        street: "",
        house: "",
        apartment: "",
        isDefault: false,
        longitude: 0,
        latitude: 0,
    };
    const dispatch = useAppDispatch();
    const shippingData = useAppSelector(({ basket }) => basket.sections.shipping.shippingData);
    const [selectedAddress, setSelectedAddress] = useState<IAddress>(otherAddress);
    const [currentAddress, setCurrentAddress] = useState<TShippingForm>({
        city: selectedAddress?.city,
        street: selectedAddress?.street,
        house: selectedAddress?.house,
        apartment: selectedAddress?.apartment,
        message: ""
    });
    const [currentAddressString, setCurrentAddressString] = useState<string>("");
    const { width } = useWindowSize();
    const [mapSize, setMapSize] = useState({
        width: "600px",
        height: "600px",
    });

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
        if (!selectedAddress) return;

        setCurrentAddress({
            city: selectedAddress?.city,
            street: selectedAddress?.street,
            house: selectedAddress?.house,
            apartment: selectedAddress?.apartment,
            message: ""
        });
    }, [selectedAddress]);

    useEffect(() => {
        if (!!selectedAddress.latitude && !!selectedAddress.longitude) return;

        let string = "";

        if (currentAddress.city) string += currentAddress.city;
        if (currentAddress.street) string += `, ${currentAddress.street}`;
        if (currentAddress.house) string += `, ${currentAddress.house}`;

        setCurrentAddressString(string);
    }, [currentAddress]);

    function onClickMap(mapData: any) {
        const { center, data } = mapData;
        const address = data.reduce((acc: any, d: any) => {
            const { kind, name } = d;

            switch (kind) {
            case "locality":
                return { ...acc, city: name };
            case "street":
                return { ...acc, street: name.replace("улица", "").trim() };
            case "house":
                return { ...acc, house: name };
            default:
                return acc;
            }
        }, { ...currentAddress });

        if (selectedAddress.id === "other") {
            dispatch(setShippingData({
                ...address,
                longitude: center[0],
                latitude: center[1],
            }));
        } else {
            dispatch(setShippingData({
                ...shippingData,
                longitude: center[0],
                latitude: center[1],
            }));
        }

        setCurrentAddress(address);
    }

    return (
        <div className={"flex flex-col gap-[24px]"}>
            <div className={"flex gap-[24px] flex-col md:flex-row lg:flex-col xl:flex-row"}>
                <div className={"flex flex-col gap-[24px] w-full md:w-1/2"}>
                    <Select
                        otherAddress={otherAddress}
                        selectedAddress={selectedAddress}
                        onChange={setSelectedAddress}
                    />
                    <ShippingForm
                        address={currentAddress}
                        isDisabled={selectedAddress?.id !== "other"}
                        onChange={setCurrentAddress}
                        onSubmit={onSubmit}
                    />
                </div>
                <YandexMap
                    height={mapSize.height}
                    isDisabled={selectedAddress.id !== "other"}
                    value={currentAddressString}
                    width={mapSize.width}
                    center={(!!selectedAddress.longitude && !!selectedAddress.latitude)
                        ? [selectedAddress.latitude, selectedAddress.longitude]
                        : undefined}
                    onChange={onClickMap}
                />
            </div>
        </div>
    );
};

export default Delivery;
