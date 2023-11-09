
import { useQuery } from "react-query";

import { fetchOrders } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IAddress, IOrderData } from "@/types/profile";

const useLastOrdersData = () => {
    return (
        useQuery<IOrderData, Error>(
            QUERY_KEYS.lastOrders,
            () => fetchOrders({
                params: {
                    page: 1,
                    size: 5,
                }
            })
        )
    );
};

export default useLastOrdersData;