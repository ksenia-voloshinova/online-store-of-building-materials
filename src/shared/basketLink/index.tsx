import { FC } from "react";

import Cart from "@/assets/icons/shopping-cart.svg";
import ActionContainer from "@/shared/containers/actionContainer";
import { useAppSelector } from "@/store/store";

interface IBasketLink {
    className: string;
}

const BasketLink: FC<IBasketLink> = ({ className }) => {
    const basketCount = useAppSelector(({ basket }) => basket.info.count);

    return (
        <ActionContainer value={basketCount}>
            <Cart className={className} />
        </ActionContainer>
    );
};

export default BasketLink;
