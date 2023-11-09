import { FC, useEffect, useState } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import usePickupAddresses from "@/hooks/api/usePickupAddresses";
import { useAppSelector } from "@/store/store";
import { IPickupAddress, IShippingPickup } from "@/types/basket";

const PickupAddress: FC = () => {
    const shipping = useAppSelector(({ basket }) => basket.sections.shipping.shippingData as IShippingPickup);
    const { data } = usePickupAddresses();
    const [address, setAddress] = useState<IPickupAddress>();

    useEffect(() => {
        if (!data) return;

        setAddress(data.find(d => d.uuid === shipping.shippingAddressId));
    }, [data, shipping.shippingAddressId]);

    return (
        <>
            {address && (
                <>
                    <p>{address.address}</p>
                    <EditIcon className={"min-w-[20px]"} />
                </>
            )}
        </>
    );
};

export default PickupAddress;
