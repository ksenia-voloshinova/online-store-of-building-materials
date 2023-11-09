import { FC, useEffect, useState } from "react";

import useBasket from "@/hooks/useBasket";
import useConverter from "@/hooks/useConverter";
import useFavorites from "@/hooks/useFavorites";
import ProductConverter from "@/shared/productConverter/index";
import { IConverterProduct } from "@/shared/productConverter/types";
import CounterButton from "@/shared/UI/buttons/counterButton";
import Modal from "@/shared/UI/popups/modal";
import { IProductConverter } from "@/types";
import { IFavoriteProduct } from "@/types/favorite";
import { RUB } from "@/utils/constants";

const FavoriteProductConverter: FC<IConverterProduct> = ({ product, isDisabled, deleteOnZero }) => {
    const { addProduct, deleteProduct, currentProduct: basketProduct } = useBasket(product.id);
    const { deleteProductFromFavorites } = useFavorites(product.id);
    const [currentProduct] = useState<IProductConverter>(basketProduct ?? product as IFavoriteProduct);
    const {
        currentBasePrice,
        setCurrentBasePrice,
        currentCount,
        setCurrentCount,
        onChange,
        getBaseCount
    } = useConverter(currentProduct);
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: ""
    });

    useEffect(() => {
        if (!basketProduct) return;

        setCurrentBasePrice(basketProduct.basePrice);
    }, [basketProduct?.basePrice]);

    function closeAlert() {
        setModalState({
            isOpen: false,
            message: ""
        });
    }

    async function add() {
        const count = currentCount + 1;
        const baseCount = getBaseCount(count);

        if (baseCount !== basketProduct?.count) {
            const { status, data } = await addProduct(baseCount);

            if (status !== 200) {
                setModalState({
                    ...modalState,
                    isOpen: true,
                    message: data.message || "Произошла ошибка"
                });
            } else {
                setCurrentCount(count);
            }
        } else {
            setCurrentCount(count);
        }
    }

    async function remove() {
        const count = currentCount - 1;
        const baseCount = getBaseCount(count );

        if (baseCount !== basketProduct?.count) {
            const result = await deleteProduct(baseCount);

            if (!result) return;

            const { status, data } = result;

            if (status !== 200) {
                setModalState({
                    ...modalState,
                    isOpen: true,
                    message: data.message || "Произошла ошибка"
                });
            } else {
                setCurrentCount(count);
            }
        } else {
            setCurrentCount(count);
        }
    }

    async function deleteFavorite() {
        const { status, data } = await deleteProductFromFavorites();

        if (status !== 200) {
            setModalState({
                ...modalState,
                isOpen: true,
                message: data.message || "Произошла ошибка",
            });
        }
    }

    return (
        <>
            <ProductConverter
                currentBasePrice={currentBasePrice}
                currentCount={currentProduct.count}
                product={product}
                onChange={onChange}
            >
                <div className={"flex items-end gap-[10px]"}>
                    <CounterButton
                        addProduct={add}
                        count={currentCount}
                        deleteOnZero={deleteOnZero}
                        deleteProduct={remove}
                        id={currentProduct.id}
                        isDisabled={isDisabled}
                        isSalable={currentProduct.isSalable}
                    />
                    <div className={"flex flex-col items-center gap-[8px] w-full sm:w-max"}>
                        {currentProduct.isSalable && (
                            <div className={"text-[22px] font-bold self-end"}>
                                {(basketProduct?.fullPrice ?? currentProduct.fullPrice).toFixed(2)} {RUB}
                            </div>
                        )}
                        <button
                            className={"p-[9px] self-end w-[137px] bg-blackLight text-white uppercase rounded"}
                            onClick={deleteFavorite}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </ProductConverter>
            <Modal isOpen={modalState.isOpen} onClose={closeAlert}>
                <p>{modalState.message}</p>
            </Modal>
        </>
    );
};

export default FavoriteProductConverter;
