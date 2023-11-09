import { Listbox } from "@headlessui/react";
import React, { FC, useEffect } from "react";

import ArrowIcon from "@/assets/icons/arrow_sm.svg";
import useAddressesData from "@/hooks/api/useAddressesData";
import { setShippingData } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IAddress } from "@/types/profile";
import getMinDate from "@/utils/getMinDate";

interface ISelect {
    otherAddress: IAddress;
    selectedAddress: IAddress;
    onChange: (address: IAddress) => void;
}

const Select: FC<ISelect> = ({ selectedAddress, otherAddress, onChange }) => {
    const dispatch = useAppDispatch();
    const { data: addresses } = useAddressesData();

    useEffect(() => {
        if (!addresses) return;

        onChange(addresses.find(address => address.isDefault) ?? otherAddress);
    }, [addresses]);

    useEffect(() => {
        if (!selectedAddress) return;

        let shippingData = {};
        const date = getMinDate(1).date;

        if (selectedAddress.id !== "other") {
            shippingData = {
                id: selectedAddress.id,
                message: "",
                longitude: selectedAddress.longitude,
                latitude: selectedAddress.latitude,
                date,
            };
        } else {
            shippingData = {
                city: selectedAddress.city,
                street: selectedAddress.street,
                house: selectedAddress.house,
                apartment: selectedAddress.apartment,
                message: "",
                longitude: selectedAddress.longitude,
                latitude: selectedAddress.latitude,
                date,
            };
        }

        dispatch(setShippingData(shippingData));
    }, [selectedAddress]);

    function renderAddresses() {
        return [otherAddress, ...addresses ?? []]?.map(address => {
            const { id, name, city, street, apartment, house } = address;
            const isDisabled = id === selectedAddress?.id;

            return (
                <Listbox.Option
                    key={id}
                    disabled={isDisabled}
                    value={address}
                    className={`p-[10px] duration-[300ms]
                    ${isDisabled
                    ? "cursor-default bg-desaturatedWhiteWarm hover:bg-desaturatedWhiteWarm"
                    : "cursor-pointer bg-white hover:bg-yellowWarm"}`}
                >
                    <p className={"font-bold"}>{name}</p>
                    {city && (
                        <p>
                            <span>г. {city}</span>
                            <span>, ул. {street}</span>
                            {house && <span>, д. {house}</span>}
                            {apartment && <span>, кв. (офис) {apartment}</span>}
                        </p>
                    )}
                </Listbox.Option>
            );
        });
    }

    return (
        <Listbox value={selectedAddress} onChange={onChange}>
            {({ open }) => (
                <div className={"relative w-full md:max-w-[500px]"}>
                    <Listbox.Button
                        className={"p-[10px] flex justify-between w-full bg-white " +
                            "border-1 border-whiteWarm rounded shadow-md font-bold"}
                    >
                        <p>{selectedAddress?.name}</p>
                        <ArrowIcon className={`fill-black duration-[300ms] 
                        ${open ? "rotate-[180deg]" : "rotate-[0deg]"}`}
                        />
                    </Listbox.Button>
                    <Listbox.Options className={"absolute top-[50px] z-[100] w-full " +
                        "bg-white border-1 border-whiteWarm rounded shadow-md"}
                    >
                        {renderAddresses()}
                    </Listbox.Options>
                </div>
            )}
        </Listbox>
    );
};

export default Select;
