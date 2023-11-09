import { FC, useState } from "react";

import CompareButton from "@/shared/productCard/actions/CompareButton";
import Counter from "@/shared/productCard/actions/Counter";
import FavoriteButton from "@/shared/productCard/actions/FavoriteButton";
import Modal from "@/shared/UI/popups/modal";
import { IProductCatalog } from "@/types/catalog";

interface IActions {
    product: IProductCatalog;
}

const Actions: FC<IActions> = ({ product }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: ""
    });

    function closeAlert() {
        setModalState({
            ...modalState,
            isOpen: false,
        });
    }

    async function openAlert(message: string | undefined) {
        setModalState({
            isOpen: true,
            message: message || "Произошла ошибка. Попробуйте еще раз.",
        });
    }

    return (
        <>
            <div className={"flex flex-wrap justify-center items-center gap-[8px] w-full"}>
                <div className={"flex gap-[8px]"}>
                    <CompareButton elementId={product.elementId} id={product.id} openAlert={openAlert} />
                    <FavoriteButton openAlert={openAlert} product={product} />
                </div>
                <div className={`${product.isSalable ? "opacity-1" : "opacity-0"}`}>
                    <Counter id={product.id} openAlert={openAlert} />
                </div>
            </div>
            <Modal isOpen={modalState.isOpen} onClose={closeAlert}>
                <p>{modalState.message}</p>
            </Modal>
        </>
    );
};

export default Actions;
