import { FC, useState } from "react";

import useAddressesData from "@/hooks/api/useAddressesData";
import AddressForm from "@/shared/forms/addressForm";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import DefaultAlert from "@/shared/UI/alerts/defaultAlert";
import { IAlertState } from "@/shared/UI/alerts/types";
import { IAddress } from "@/types/profile";

const AddressesList: FC = () => {
    const { isLoading, isFetching, isError, data } = useAddressesData();
    const [addresses, setAddresses] = useState<IAddress[]>(data ?? []);
    const [localAddresses, setLocalAddresses] = useState<IAddress[]>([]);
    const [alertState, setAlertState] = useState<IAlertState>({
        isOpen: false,
        status: "success",
        message: ""
    });

    function closeAlert() {
        setAlertState({
            ...alertState,
            isOpen: false,
        });
    }

    function addAddress() {
        const index = [...addresses, ...localAddresses].length + 1;

        setLocalAddresses([...localAddresses, {
            id: `address-${index}`,
            isNew: true,
            isEdit: true,
            name: `Адрес ${index}`,
            city: "",
            street: "",
            house: "",
            apartment: "",
            isDefault: false,
            longitude: 0,
            latitude: 0,
        }]);
    }

    function onSubmit(addresses: IAddress[], id: string, message: string, isNew?: boolean) {
        setAddresses(addresses);
        setAlertState({
            isOpen: true,
            status: "success",
            message
        });

        if (!!isNew) {
            deleteLocalAddress(id);
        }
    }

    function deleteLocalAddress(id: string) {
        setLocalAddresses(localAddresses.filter(address => address.id !== id));
    }

    function renderAddresses() {
        return [...addresses, ...localAddresses].map(address => {
            return (
                <AddressForm
                    key={address.id}
                    address={address}
                    deleteLocalAddress={deleteLocalAddress}
                    onSubmitForm={onSubmit}
                />
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить список адресов"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex flex-col gap-[16px]"}>
                {[...addresses, ...localAddresses].length === 0 ? (
                    <div className={"text-[24px] font-bold"}>Список адресов пуст</div>
                ) : (
                    <ul className={"flex flex-col gap-[24px]"}>
                        {renderAddresses()}
                    </ul>
                )}
                <button
                    className={"w-max text-xs text-yellowWarm font-bold duration-[300ms] hover:underline"}
                    onClick={addAddress}
                >
                    Добавить адрес
                </button>
            </div>
            <DefaultAlert
                isOpen={alertState.isOpen}
                message={alertState.message}
                status={alertState.status}
                onClose={closeAlert}
            />
        </Interceptor>
    );
};

export default AddressesList;
