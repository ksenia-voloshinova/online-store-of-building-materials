import { useQuery } from "react-query";

import { fetchShippingTypes } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IShippingType } from "@/types/basket";

const useShippingTypes = () => {
    return (
        useQuery<IShippingType[], Error>(QUERY_KEYS.shippingTypes, fetchShippingTypes)
    );
};

export default useShippingTypes;
