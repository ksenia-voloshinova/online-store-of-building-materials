import React, { FC, useState } from "react";

import Delivery from "@/components/basket/shipping/Delivery";
import Pickup from "@/components/basket/shipping/Pickup";
import Types from "@/components/basket/shipping/Types";
import { setSectionsActive } from "@/store/slices/basketSlice";
import { useAppDispatch } from "@/store/store";
import { SHIPPING_TYPE, TShippingType } from "@/types/basket";

const Shipping: FC = () => {
    const dispatch = useAppDispatch();
    const [shippingCode, setShippingCode] = useState<TShippingType>(SHIPPING_TYPE.shipping);
    const components = {
        [SHIPPING_TYPE.shipping]: <Delivery onSubmit={onSubmit} />,
        [SHIPPING_TYPE.pickup]: <Pickup onSubmit={onSubmit} />,
    };

    function onSubmit() {
        dispatch(setSectionsActive("customer"));
    }

    function onChangeShippingCode(code: TShippingType) {
        setShippingCode(code);
    }

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <Types onChangeShippingCode={onChangeShippingCode} />
            {components[shippingCode]}
        </div>
    );
};

export default Shipping;
