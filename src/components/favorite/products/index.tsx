import { FC } from "react";

import favoritesService from "@/services/favoritesService";
import Pagination from "@/shared/pagination";
import ProductCardCounter from "@/shared/productCard/productCardCounter";
import FavoriteProductConverter from "@/shared/productConverter/FavoriteProductConverter";
import { setFavoritesData } from "@/store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Products: FC = () => {
    const dispatch = useAppDispatch();
    const { pageCount, pageNumber, favorites } = useAppSelector(({ favorites }) => favorites.data);

    async function onClickPage(page: number) {
        const response = await favoritesService.getFavoritesProducts({
            params: {
                page
            }
        });

        if (response.status === 200) {
            dispatch(setFavoritesData(response.data));
        }

        return response;
    }

    function renderProducts() {
        return favorites.map(product => {
            return (
                <li key={product.id} className={"border-b-1 border-whiteWarm last:border-none print:border-b-1"}>
                    <ProductCardCounter containerStyle={"!justify-end !items-start"} product={product}>
                        <FavoriteProductConverter deleteOnZero={true} product={product} />
                    </ProductCardCounter>
                </li>
            );
        });
    }

    return (
        <div className={"print:hidden"}>
            <ul className={"print:hidden"}>{renderProducts()}</ul>
            <Pagination currentPage={pageNumber} pages={pageCount} onClick={onClickPage} />
        </div>
    );
};

export default Products;
