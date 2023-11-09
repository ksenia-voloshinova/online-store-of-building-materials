import { FC, useEffect, useState } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import useAddressesData from "@/hooks/api/useAddressesData";
import { useAppSelector } from "@/store/store";
import { IShippingAddress } from "@/types/basket";
import { IAddress } from "@/types/profile";

const CustomerAddress: FC = () => {
    const shipping = useAppSelector(({ basket }) => basket.sections.shipping.shippingData as IShippingAddress);
    const { data } = useAddressesData();
    const [address, setAddress] = useState<IAddress>();

    useEffect(() => {
        if (!data) return;

        setAddress(data.find(d => d.id === shipping.id));
    }, [data, shipping.id]);

    return (
        <>
            {address && (
                <>
                    <p>
                        <span>г. {address.city}</span>
                        <span>, ул. {address.street}</span>
                        {address.house && <span>, д. {address.house}</span>}
                        {address.apartment && <span>, кв. (офис) {address.apartment}</span>}
                    </p>
                    <EditIcon className={"min-w-[20px]"} />
                </>
            )}
        </>
    );
};

export default CustomerAddress;
