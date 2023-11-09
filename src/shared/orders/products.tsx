import { FC } from "react";

import ProductCardCounter from "@/shared/productCard/productCardCounter";
import { IProduct } from "@/types";

interface IProductList {
    products: IProduct[];
}

const Products: FC<IProductList> = ({ products }) => {
    function renderProducts() {
        // Для заказов чтобы выводился fullPrice
        return products.map(el => ({ ...el, isSalable:true })).map(product => {
            return (
                <li key={product.id}>
                    <ProductCardCounter deleteOnZero={false} isDisabled={true} product={product}  />
                </li>
            );
        });
    }

    return (
        <ul>
            {renderProducts()}
        </ul>
    );
};

export default Products;
