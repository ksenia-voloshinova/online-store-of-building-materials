import { useQuery } from "react-query";

import { fetchShippingPickup } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IPickupAddress } from "@/types/basket";

const usePickupAddresses = () => {
    return (
        useQuery<IPickupAddress[], Error>(QUERY_KEYS.pickupAddresses, fetchShippingPickup)
    );
};

export default usePickupAddresses;
