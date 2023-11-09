import { FC, useState } from "react";

import Cheque from "@/components/basket/payment/Cheque";
import Comment from "@/components/basket/payment/Comment";
import Types from "@/components/basket/payment/Types";
import useBasketErrors from "@/hooks/useBasketErrors";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import SuccessPayment from "@/shared/UI/popups/successPayment";
import UserAgreement from "@/shared/userAgreement";
import { setSectionsActive } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface IPayment {
    openAlert: (message: string) => void;
}

const Payment: FC<IPayment> = ({ openAlert }) => {
    const dispatch = useAppDispatch();
    const basketProducts = useAppSelector(({ basket }) => basket.products);
    const { validateErrors } = useBasketErrors();
    const [modalState, setModalState] = useState({
        isOpen: false,
        email: "",
        orderNumber: ""
    });

    async function onSubmit() {
        const { status, message, errors, data } = await validateErrors();

        if (!errors) {
            if (status === 200) {
                setModalState({
                    isOpen: true,
                    ...data
                });
                dispatch(setSectionsActive("basket"));
            } else {
                openAlert(message ?? "Ошибка оформления заказа! Попробуйте еще раз!");
            }
        } else {
            openAlert(message);
        }
    }

    function closeModal() {
        setModalState({
            email: "",
            orderNumber: "",
            isOpen: false,
        });
    }

    return (
        <>
            <div className={"flex flex-col gap-[50px]"}>
                <div className={"flex flex-col gap-[16px]"}>
                    <Types />
                    <Comment />
                    <Cheque />
                </div>
                <div className={"flex flex-col gap-[8px]"}>
                    <DefaultButton
                        isDisabled={!basketProducts.length}
                        onClick={onSubmit}>
                        Подтвердить и оплатить
                    </DefaultButton>
                    <UserAgreement />
                </div>
            </div>
            <SuccessPayment
                email={modalState.email}
                isOpen={modalState.isOpen}
                orderNumber={modalState.orderNumber}
                onClose={closeModal}
            />
        </>
    );
};

export default Payment;
