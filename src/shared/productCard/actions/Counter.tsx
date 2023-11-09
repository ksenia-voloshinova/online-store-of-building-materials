import { FC } from "react";

import useBasket from "@/hooks/useBasket";
import CounterButton from "@/shared/UI/buttons/counterButton";

interface ICounter {
    id: number;
    openAlert: (message: string | undefined) => void;
}

const Counter: FC<ICounter> = ({ id, openAlert }) => {
    const { addProduct, deleteProduct, currentProduct } = useBasket(id);

    async function add() {
        const currentCount = currentProduct ? currentProduct.count + 1 : 1;
        const { status, data } = await addProduct(currentCount);

        if (status !== 200) {
            openAlert(data.message);
        }
    }

    async function remove() {
        const currentCount = currentProduct ? currentProduct.count - 1 : 0;
        const result = await deleteProduct(currentCount);

        if (!result) return;

        const { status, data } = result;

        if (status !== 200) {
            openAlert(data.message);
        }
    }

    return (
        <CounterButton
            addProduct={add}
            count={currentProduct ? currentProduct.count : 0}
            deleteProduct={remove}
        />
    );
};

export default Counter;
