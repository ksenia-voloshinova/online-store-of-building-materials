import { FC, useState } from "react";

import profileService from "@/services/profileService";
import OrderItem from "@/shared/orders/item";
import DefaultAlert from "@/shared/UI/alerts/defaultAlert";
import { IAlertState } from "@/shared/UI/alerts/types";
import { setBasket } from "@/store/slices/basketSlice";
import { useAppDispatch } from "@/store/store";
import { IOrder } from "@/types/profile";

interface IOrdersList {
    orders: IOrder[];
    refetchOrders: () => void;
}

const OrdersList: FC<IOrdersList> = ({ orders, refetchOrders }) => {
    const dispatch = useAppDispatch();
    const [alertState, setAlertState] = useState<IAlertState>({
        status: "success",
        message: "",
        isOpen: false
    });

    function closeAlert() {
        setAlertState({
            ...alertState,
            isOpen: false,
        });
    }

    async function cancelOrder(id: string) {
        const { status, data } = await profileService.cancelOrder(id);

        if (status === 200) {
            await refetchOrders();
            setAlertState({
                status: "success",
                message: data.message,
                isOpen: true,
            });
        } else {
            setAlertState({
                status: "error",
                message: data.message,
                isOpen: true,
            });
        }
    }

    async function repeatOrder(id: string) {
        const { status, data } = await profileService.repeatOrder(id);

        if (status === 200) {
            await dispatch(setBasket({
                products: data,
                info: {
                    weight: 0,
                    volume: 0,
                    fullPrice: 0,
                    count: data.length
                }
            }));
            await refetchOrders();

            setAlertState({
                status: "success",
                message: "Заказ повторно добавлен в корзину!",
                isOpen: true,
            });
        } else {
            setAlertState({
                status: "error",
                message: data.message,
                isOpen: true,
            });
        }
    }

    function renderOrders() {
        return orders.map(order => {
            return <OrderItem
                key={order.id}
                cancel={() => cancelOrder(order.id)}
                order={order}
                repeat={() => repeatOrder(order.id)}
            />;
        });
    }

    return (
        <>
            {orders?.length > 0 && (
                <>
                    <div>
                        <div className={"px-[20px] py-[11px] hidden md:grid grid-cols-6 gap-[20px] bg-cyanBlueLight"}>
                            <p>Заказ сайта #</p>
                            <p>Дата</p>
                            <p>Сумма заказа</p>
                            <p>Статус</p>
                            <p>Повторить заказ</p>
                            <p>Подробнее</p>
                        </div>
                        <ul>{renderOrders()}</ul>
                    </div>
                    <DefaultAlert
                        isOpen={alertState.isOpen}
                        message={alertState.message}
                        status={alertState.status}
                        onClose={closeAlert}
                    />
                </>
            )}
        </>
    );
};

export default OrdersList;
