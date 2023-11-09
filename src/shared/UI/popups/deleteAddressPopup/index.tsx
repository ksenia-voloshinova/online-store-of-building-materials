import { FC } from "react";

import DefaultButton from "@/shared/UI/buttons/defaultButton";
import Modal from "@/shared/UI/popups/modal";
import { IPopup } from "@/shared/UI/popups/types";

interface IDeleteAddressPopup extends IPopup {
    name: string;
    deleteAddress: () => void;
}

const DeleteAddressPopup: FC<IDeleteAddressPopup> = ({ isOpen, onClose, deleteAddress, name }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"flex flex-col items-center gap-[24px]"}>
                <p>Вы уверены, что хотите удалить адрес <strong>{name}</strong>?</p>
                <div className={"flex justify-center gap-[16px]"}>
                    <DefaultButton onClick={deleteAddress}>Да</DefaultButton>
                    <DefaultButton
                        styles={"!bg-cyanBlueMiddle !text-white hover:!bg-blueMagenta"}
                        onClick={onClose}
                    >
                        Нет
                    </DefaultButton>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAddressPopup;