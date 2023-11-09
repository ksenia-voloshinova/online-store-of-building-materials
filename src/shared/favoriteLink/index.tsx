import { FC } from "react";

import Fav from "@/assets/icons/fav.svg";
import ActionContainer from "@/shared/containers/actionContainer";
import { useAppSelector } from "@/store/store";

interface IFavoriteLink {
    className: string;
}

const FavoriteLink: FC<IFavoriteLink> = ({ className }) => {
    const productsLength = useAppSelector(({ favorites }) => favorites.data.productsCount);

    return (
        <ActionContainer value={productsLength}>
            <Fav className={className}  />
        </ActionContainer>
    );
};

export default FavoriteLink;
