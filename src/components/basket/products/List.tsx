import { FC } from "react";

import ProductCardCounter from "@/shared/productCard/productCardCounter";
import BasketProductConverter from "@/shared/productConverter/BasketProductConverter";
import { useAppSelector } from "@/store/store";

const List: FC = () => {
    const basketProducts = useAppSelector(({ basket }) => basket.products);

    function renderProducts() {
        return basketProducts.map(product => {
            return (
                <li key={product.id} className={"border-b-1 border-whiteWarm"}>
                    <ProductCardCounter product={product}>
                        <BasketProductConverter deleteOnZero={false} product={product} />
                    </ProductCardCounter>
                </li>
            );
        });
    }

    return (
        <>
            {basketProducts.length ? (
                <ul className={"mb-[25px]"}>{renderProducts()}</ul>
            ) : (
                <div className={"mb-[25px]"}>Нет товаров в корзине</div>
            )}
        </>
    );
};

export default List;
