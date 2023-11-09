
import { useQuery } from "react-query";

import { fetchOrders } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IOrderData } from "@/types/profile";

const useOrdersData = (page: number) => {
    return (
        useQuery<IOrderData, Error>(
            [QUERY_KEYS.orders, page],
            () => fetchOrders({
                params: {
                    page,
                }
            }),
            {
                enabled: !!page,
            }
        )
    );
};

export default useOrdersData;