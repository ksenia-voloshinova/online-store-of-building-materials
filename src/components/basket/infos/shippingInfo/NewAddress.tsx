import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import { useAppSelector } from "@/store/store";
import { IShippingNewAddress } from "@/types/basket";

const NewAddress: FC = () => {
    const {
        city, house, street, apartment
    } = useAppSelector(({ basket }) => basket.sections.shipping.shippingData as IShippingNewAddress);
    const isShowEdit = city || street || house || apartment;

    return (
        <>
            <p>
                {city && <span>г. {city}, </span>}
                {street && <span>ул. {street}, </span>}
                {house && <span>д. {house}, </span>}
                {apartment && <span>кв. (офис) {apartment}</span>}
            </p>
            {isShowEdit && <EditIcon className={"min-w-[20px]"} />}
        </>
    );
};

export default NewAddress;
