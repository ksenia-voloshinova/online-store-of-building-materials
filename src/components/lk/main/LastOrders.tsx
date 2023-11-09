import { FC } from "react";

import useLastOrdersData from "@/hooks/api/useLastOrdersData";
import OrdersList from "@/shared/orders";

const LastOrders: FC = () => {
    const { data, refetch } = useLastOrdersData();

    return (
        <>
            {data?.orders && (
                <OrdersList
                    orders={data?.orders ?? []}
                    refetchOrders={refetch}
                />
            )}
        </>
    );
};

export default LastOrders;
