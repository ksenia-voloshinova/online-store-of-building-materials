import { Disclosure, Transition } from "@headlessui/react";
import { FC } from "react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import More from "@/assets/icons/more-horizontal.svg";
import Products from "@/shared/orders/products";
import { IOrder } from "@/types/profile";
import { RUB } from "@/utils/constants";

interface IOrderItem {
    order: IOrder;
    cancel: () => void;
    repeat: () => void;
}

const OrderItem: FC<IOrderItem> = ({ order, cancel, repeat }) => {
    const { orderNumber, datetime, status, actions, fullPrice, items } = order;

    return (
        <Disclosure as={"li"}>
            {({ open }) => (
                <>
                    <div className={"md:px-[20px] py-[11px] " +
                        "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_24px] md:grid-cols-6 gap-y-[5px] " +
                        "gap-x-[15px] md:gap-[20px] w-full border-b-1 border-whiteWarm text-xs md:text-[16px]"}
                    >
                        <p className={"border-b-1 border-whiteWarm md:border-none text-cyanBlueDark break-all"}>
                            {orderNumber}
                        </p>
                        <p className={"col-start-1 row-start-2 md:col-start-auto md:row-start-auto text-cyanBlueDark " +
                           "break-all"}
                        >
                            {datetime}
                        </p>
                        <p className={"border-b-1 border-whiteWarm md:border-none text-cyanBlueDark"}>
                            {fullPrice} {RUB}
                        </p>
                        <p className={"text-cyanBlueDark"}>{status}</p>
                        {
                            actions.canCancel ? (
                                <button
                                    className={"col-start-3 row-start-1 md:col-start-5 text-left font-bold"}
                                    type={"button"}
                                    onClick={cancel}
                                >
                                    Отменить заказ
                                </button>
                            ) : (
                                <button
                                    className={"col-start-3 row-start-1 md:col-start-5 text-left font-bold"}
                                    type={"button"}
                                    onClick={repeat}
                                >
                                    Повторить заказ
                                </button>
                            )
                        }
                        <Disclosure.Button
                            className={"col-start-4 row-start-1 md:col-start-6 text-sm text-cyanBlueDark text-center"}
                        >
                            <More className={"hidden md:block"} />
                            <Arrow
                                className={`md:hidden fill-blueMagentaDark duration-[300ms] 
                                ${open ? "rotate-180" : ""}`}
                            />
                        </Disclosure.Button>
                    </div>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className={"w-full"}>
                            <Products products={items} />
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default OrderItem;
