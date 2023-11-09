import { FC } from "react";

import FavIcon from "@/assets/icons/fav-sm.svg";
import useFavorites from "@/hooks/useFavorites";
import ButtonContainer from "@/shared/productCard/actions/ButtonContainer";
import { IProductCatalog } from "@/types/catalog";

interface IFavoriteButton {
    product: IProductCatalog;
    openAlert: (message: string | undefined) => void;
}

const FavoriteButton: FC<IFavoriteButton> = ({ product, openAlert }) => {
    const { currentProduct, toggleProductFavorites } = useFavorites(product.id);

    async function toggleFavorite() {
        const { status, data } = await toggleProductFavorites();

        if (status !== 200) {
            openAlert(data.message);
        }
    }

    return (
        <ButtonContainer isActive={!!currentProduct} onClick={toggleFavorite}>
            <FavIcon className={`${currentProduct ? "stroke-black group-hover:stroke-white" : "stroke-black"}`} />
        </ButtonContainer>
    );
};

export default FavoriteButton;
