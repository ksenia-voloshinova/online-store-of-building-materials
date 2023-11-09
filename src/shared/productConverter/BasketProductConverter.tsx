import { FC, useEffect, useState } from "react";

import useBasket from "@/hooks/useBasket";
import useConverter from "@/hooks/useConverter";
import ProductConverter from "@/shared/productConverter/index";
import { IConverterProduct } from "@/shared/productConverter/types";
import Modal from "@/shared/UI/popups/modal";
import { IProductConverter } from "@/types";

const BasketProductConverter: FC<IConverterProduct> = ({ product, deleteOnZero, isDisabled }) => {
    const {
        addProduct,
        deleteProduct,
        deleteTotalProduct,
        currentProduct: basketProduct,
    } = useBasket(product.id);
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: "",
    });
    const [currentProduct] = useState<IProductConverter>(basketProduct ?? product as IProductConverter);
    const {
        currentBasePrice,
        setCurrentBasePrice,
        currentCount,
        setCurrentCount,
        onChange,
        getBaseCount
    } = useConverter(currentProduct);

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

    async function removeTotal() {
        await deleteTotalProduct();

        setCurrentCount(0);
        setCurrentBasePrice(currentProduct.basePrice);
    }

    return (
        <>
            <ProductConverter
                add={add}
                currentBasePrice={currentBasePrice}
                currentCount={currentCount}
                deleteOnZero={deleteOnZero}
                fullPrice={basketProduct?.fullPrice ?? currentProduct.fullPrice}
                isDisabled={isDisabled}
                product={currentProduct}
                remove={remove}
                removeTotal={removeTotal}
                onChange={onChange}
            />
            <Modal isOpen={modalState.isOpen} onClose={closeAlert}>
                <p>{modalState.message}</p>
            </Modal>
        </>
    );
};

export default BasketProductConverter;
