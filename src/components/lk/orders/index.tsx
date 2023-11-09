import { FC, useState } from "react";

import useOrdersData from "@/hooks/api/useOrdersData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import OrdersList from "@/shared/orders";
import Pagination from "@/shared/pagination";

const Orders: FC = () => {
    const [page, setPage] = useState(1);
    const { isLoading, isFetching, isError, data: ordersData, refetch } = useOrdersData(page);

    function handlePage(currentPage: number) {
        setPage(currentPage);
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить список заказов"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            {!!ordersData?.orders?.length ? (
                <>
                    <OrdersList
                        orders={ordersData?.orders ?? []}
                        refetchOrders={refetch}
                    />
                    {ordersData?.pageCount > 1 && (
                        <Pagination currentPage={page} pages={ordersData?.pageCount} onClick={handlePage} />
                    )}
                </>
            ) : (
                <p>Список заказов пуст</p>
            )}
        </Interceptor>
    );
};

export default Orders;
