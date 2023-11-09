import { FC } from "react";

import DefaultButton from "@/shared/UI/buttons/defaultButton";
import Modal from "@/shared/UI/popups/modal";
import { IPopup } from "@/shared/UI/popups/types";
import { useAppSelector } from "@/store/store";
import { BASE_DOMAIN } from "@/utils/constants";

interface ISuccessPayment extends IPopup {
    orderNumber: string;
    email: string;
}

const SuccessPayment: FC<ISuccessPayment> = ({ email, orderNumber, isOpen, onClose }) => {
    const user = useAppSelector(({ user }) => user.data);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={"flex flex-col items-center gap-[24px]"}>
                <p className={"text-[22px] font-bold"}>
                    {user.firstName ? `${user.firstName}, спасибо за заказ!` : "Спасибо за заказ!"}
                </p>
                <p className={"text-center"}>
                    Ваш заказ <span className={"font-bold"}>{orderNumber}</span> передан в обработку.
                    Мы свяжемся с вами в ближайшее время
                    для подтверждения данных. Сведения
                    о заказе отправлены на <span className={"font-bold"}>{email}</span>
                </p>
                <div className={"flex gap-[16px]"}>
                    <DefaultButton onClick={onClose}>Продолжить покупки</DefaultButton>
                    <a href={`${typeof window === "undefined" ? "#" : BASE_DOMAIN}`}>
                        <DefaultButton styles={"!bg-cyanBlueMiddle !text-white hover:!bg-blueMagenta"}>
                            Вернуться на главную
                        </DefaultButton>
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default SuccessPayment;
