import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import EditIcon from "@/assets/icons/pen.svg";
import DeleteIcon from "@/assets/icons/trash.svg";
import useFormState from "@/hooks/useFormState";
import profileService from "@/services/profileService";
import FormContainer from "@/shared/containers/formContainer";
import { ADDRESS_FORM_DATA } from "@/shared/forms/addressForm/constants";
import { TAddress, TAddressFields } from "@/shared/forms/addressForm/types";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import ControlledFullColoredCheckbox from "@/shared/UI/checkboxes/controlledFullColoredCheckbox";
import DefaultInputControlled from "@/shared/UI/inputs/defaultInputControlled";
import DeleteAddressPopup from "@/shared/UI/popups/deleteAddressPopup";
import { NAME_FIELDS } from "@/types/forms";
import { IAddress } from "@/types/profile";
import { ADDRESS_SCHEMA } from "@/utils/schemas";

interface IAddressesForm {
    address: IAddress;
    deleteLocalAddress: (id: string) => void;
    onSubmitForm: (addresses: IAddress[], id: string, message: string, isNew?: boolean) => void;
}

const AddressForm: FC<IAddressesForm> = ({ address, onSubmitForm, deleteLocalAddress }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(!!address.isEdit);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { isError, isSuccess, setError, message, setSuccess } = useFormState();
    const { handleSubmit, control, setValue, formState: { errors } } = useForm<TAddress>({
        resolver: yupResolver(ADDRESS_SCHEMA),
    });

    useEffect(() => {
        setFormValue();
    }, [address]);

    function setFormValue() {
        Object.entries(address).forEach(([key, value]) => {
            setValue(key as TAddressFields, value);
        });
    }

    async function onSubmit(addressData: TAddress) {
        const { name, city, street, house, apartment, isDefault } = addressData;
        const currentAddress = { name, city, street, house, apartment, isDefault };
        const { status, data } = !address.isNew
            ? await profileService.updateUserAddress(address.id, currentAddress)
            : await profileService.createUserAddress(currentAddress);

        await validateStatus(status, data.message);
    }

    async function deleteAddress() {
        if (address.isNew) {
            deleteLocalAddress(address.id);
        } else {
            const { status, data } = await profileService.deleteUserAddress(address.id);

            await validateStatus(status, data.message);
        }
    }

    async function validateStatus(status: number, message: string) {
        if (status === 200) {
            const { status, data } = await profileService.getUserAddress();

            if (status === 200) {
                onSubmitForm(data, address.id, message, address.isNew);
                setIsEditMode(false);
                await setSuccess("");
            } else {
                await setError(data.message);
            }
        } else {
            await setError(message);
        }
    }

    function closeEditMode() {
        setIsEditMode(false);
        setFormValue();
    }

    function renderLoginFields() {
        return ADDRESS_FORM_DATA.map(data => {
            const { name, placeholder } = data;

            return (
                <DefaultInputControlled
                    key={name}
                    control={control}
                    defaultValue={address[name] as string}
                    errorMessage={errors[name]?.message ?? ""}
                    isDisabled={!isEditMode}
                    isError={!!errors[name]?.message}
                    name={name}
                    placeholder={placeholder}
                />
            );
        });
    }

    return (
        <FormContainer
            isError={isError}
            isSuccess={isSuccess}
            message={message}
            showRequire={false}
        >
            <form className={"flex flex-col gap-[24px]"} onSubmit={handleSubmit(onSubmit)}>
                <div className={"pb-[16px] flex flex-col justify-between md:items-center md:flex-row gap-[16px] " +
                    "border-b-1 border-whiteWarm"}
                >
                    <div className={"flex items-center gap-[17px] w-max"}>
                        {isEditMode ? (
                            <DefaultInputControlled
                                control={control}
                                defaultValue={address.name}
                                errorMessage={errors[NAME_FIELDS.addressName]?.message ?? ""}
                                isError={!!errors[NAME_FIELDS.addressName]?.message}
                                name={NAME_FIELDS.addressName}
                            />
                        ) : (
                            <p className={"text-[22px] font-bold"}>{address.name}</p>
                        )}
                        {!address.isNew && (
                            <>
                                {isEditMode ? (
                                    <button className={"text-red text-sm"} type={"button"} onClick={closeEditMode}>
                                        Отменить
                                    </button>
                                ) : (
                                    <button type={"button"} onClick={() => setIsEditMode(true)}>
                                        <EditIcon />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <div className={"flex items-center gap-[17px]"}>
                        <ControlledFullColoredCheckbox
                            control={control}
                            defaultValue={address.isDefault}
                            errorMessage={errors[NAME_FIELDS.isDefaultAddress]?.message ?? ""}
                            isDisabled={!isEditMode}
                            name={NAME_FIELDS.isDefaultAddress}
                        >
                            по умолчанию
                        </ControlledFullColoredCheckbox>
                        <button type={"button"} onClick={() => setIsOpenModal(true)}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-[24px]"}>
                    {renderLoginFields()}
                </div>
                {isEditMode && <DefaultButton>Сохранить</DefaultButton>}
            </form>
            <DeleteAddressPopup
                deleteAddress={deleteAddress}
                isOpen={isOpenModal}
                name={address.name}
                onClose={() => setIsOpenModal(false)}
            />
        </FormContainer>
    );
};

export default AddressForm;
