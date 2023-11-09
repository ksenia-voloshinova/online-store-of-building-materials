import { FC } from "react";

import CustomerAddress from "@/components/basket/infos/shippingInfo/CustomerAddress";
import NewAddress from "@/components/basket/infos/shippingInfo/NewAddress";
import PickupAddress from "@/components/basket/infos/shippingInfo/PickupAddress";
import { useAppSelector } from "@/store/store";

const ShippingInfo: FC = () => {
    const shipping = useAppSelector(({ basket }) => basket.sections.shipping);
    const isNewAddress = "city" in shipping.shippingData;
    const isPickupAddress = "shippingAddressId" in shipping.shippingData
        ? shipping.shippingData?.shippingAddressId
        : false;
    const isCustomerAddress = !isNewAddress && !isPickupAddress;

    function renderAddress() {
        if (isNewAddress) return <NewAddress />;
        else if (isCustomerAddress) return <CustomerAddress />;
        else if (isPickupAddress) return <PickupAddress />;
    }

    return (
        <>
            {renderAddress()}
        </>
    );
};

export default ShippingInfo;
