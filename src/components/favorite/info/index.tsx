import { FC, useState } from "react";

import SuccessIcon from "@/assets/icons/check-true.svg";
import FileTextIcon from "@/assets/icons/file-text.svg";
import MailIcon from "@/assets/icons/mail.svg";
import favoritesService from "@/services/favoritesService";
import SendFavoritesOnEmail from "@/shared/forms/sendFavoritesOnEmail";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import Modal from "@/shared/UI/popups/modal";

const Info: FC = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isDisabledPdfButton, setIsDisabledPdfButton] = useState<boolean>(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        children: <></>
    });

    function closeModal() {
        setModalState({
            ...modalState,
            isOpen: false
        });
    }

    async function getPdfLink() {
        await toggleDisabledPdfButton(true);

        const { status, data } = await favoritesService.getFavoritesPdfLink();

        if (status === 200) {
            window.open(data.link, "_blank");
        } else {
            setModalState({
                isOpen: true,
                children: (
                    <p>
                        {data.message ?? "Произошла ошибка при получении PDF файла избранного. Попробуйте ещё раз."}
                    </p>
                )
            });
        }

        await toggleDisabledPdfButton(false);
    }

    async function toggleDisabledPdfButton(value: boolean) {
        setIsDisabledPdfButton(value);
    }

    async function openEmailModal() {
        setModalState({
            isOpen: true,
            children: <SendFavoritesOnEmail onCancel={closeModal} onSubmit={onSubmit} />
        });
    }

    function onSubmit(isSuccess: boolean) {
        if (!isSuccess) return;

        setIsSuccess(true);
        closeModal();
    }

    return (
        <>
            <div className={"mt-[40px] flex flex-wrap gap-[25px] print:hidden"}>
                <div className={"flex flex-col gap-[8px] max-w-[300px] text-xs"}>
                    <p>
                        Сохраните выбранные товары в Избранное, чтобы подготовиться к походу в магазин.
                        Сохраните или распечатайте этот список.
                    </p>
                    <p>
                        Обращаем внимание, что добавление товаров в Избранное не является резервированием или заказом.
                    </p>
                </div>
                <div className={"flex flex-col gap-[16px] text-sm"}>
                    <button
                        className={`flex items-center gap-[8px] 
                        ${isSuccess ? "text-cyanBlueCool" : "text-blueMagentaDark"}`}
                        onClick={openEmailModal}
                    >
                        {isSuccess ? <SuccessIcon className={"w-[24px] h-[24px]"} /> : <MailIcon />}
                        Отправить на электронную почту
                    </button>
                    <button
                        disabled={isDisabledPdfButton}
                        className={`flex items-center gap-[8px] ${isDisabledPdfButton 
                            ? "text-cyanBlueCool" : "text-blueMagentaDark"}`}
                        onClick={getPdfLink}
                    >
                        <FileTextIcon
                            className={`${isDisabledPdfButton ? "fill-cyanBlueCool" : "fill-yellowWarm"}`}
                        />
                        Скачать список файлом
                    </button>
                    <DefaultButton onClick={() => window.print()}>
                        Распечатать список
                    </DefaultButton>
                </div>
            </div>
            <Modal isOpen={modalState.isOpen} onClose={closeModal}>
                {modalState.children}
            </Modal>
        </>
    );
};

export default Info;
