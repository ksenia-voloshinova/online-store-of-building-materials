import { FC, useEffect, useRef, useState } from "react";

import Button from "@/components/basket/content/Button";
import BasketInfo from "@/components/basket/infos/basketInfo";
import CustomerInfo from "@/components/basket/infos/customerInfo";
import ShippingInfo from "@/components/basket/infos/shippingInfo";
import Payment from "@/components/basket/payment";
import PersonalInfo from "@/components/basket/personalInfo";
import Products from "@/components/basket/products";
import Shipping from "@/components/basket/shipping";
import DefaultAlert from "@/shared/UI/alerts/defaultAlert";
import { IAlertState } from "@/shared/UI/alerts/types";
import { setSectionsActive, setSectionsState } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Content: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(({ user }) => user.isAuth);
    const basketSectionsState = useAppSelector(({ basket }) => basket.sectionsState);
    const productsRef = useRef<any>(null);
    const shippingRef = useRef<any>(null);
    const customerRef = useRef<any>(null);
    const paymentRef = useRef<any>(null);
    const [alertState, setAlertState] = useState<IAlertState>({
        isOpen: false,
        status: "success",
        message: ""
    });
    const data = [
        {
            id: "basket",
            title: "Корзина",
            isPrivate: false,
            component: <Products />,
            info: <BasketInfo />,
            ref: productsRef,
        },
        {
            id: "shipping",
            title: "Доставка",
            isPrivate: true,
            component: <Shipping />,
            info: <ShippingInfo />,
            ref: shippingRef,
        },
        {
            id: "customer",
            title: "Личные данные",
            isPrivate: true,
            component: <PersonalInfo />,
            info: <CustomerInfo />,
            ref: customerRef,
        },
        {
            id: "payment",
            title: "Оплата",
            isPrivate: true,
            component: <Payment openAlert={openAlert} />,
            ref: paymentRef,
        },
    ];

    useEffect(() => {
        const productsPos = productsRef.current.getBoundingClientRect();
        const shippingPos = shippingRef.current.getBoundingClientRect();
        const customerPos = customerRef.current.getBoundingClientRect();
        const paymentPos = paymentRef.current.getBoundingClientRect();

        dispatch(setSectionsState({
            basket: {
                ...basketSectionsState.basket,
                position: { x: productsPos.x, y: productsPos.y }
            },
            shipping: {
                ...basketSectionsState.shipping,
                position: { x: shippingPos.x, y: shippingPos.y }
            },
            customer: {
                ...basketSectionsState.customer,
                position: { x: customerPos.x, y: customerPos.y }
            },
            payment: {
                ...basketSectionsState.payment,
                position: { x: paymentPos.x, y: paymentPos.y }
            },
        }));
    }, [productsRef.current, shippingRef.current, customerRef.current, paymentRef.current]);

    function openAlert(message: string) {
        setAlertState({
            isOpen: true,
            status: "error",
            message
        });
    }

    function closeAlert() {
        setAlertState({
            ...alertState,
            isOpen: false,
        });
    }

    function openAccordion(id: string) {
        dispatch(setSectionsActive(id));
    }

    function renderAccordion() {
        return data.map((d, index) => {
            const { id, title, component, isPrivate, ref, info } = d;
            const isOpen = basketSectionsState[id].isActive;
            const isClosed = isPrivate && !isAuth;

            return (
                <div key={index} ref={ref} className={"flex flex-col lg:flex-row gap-[20px] w-full"}>
                    <Button
                        index={index + 1}
                        isClosed={isClosed}
                        isOpen={isOpen}
                        isPrivate={isPrivate}
                        open={() => openAccordion(id)}
                        title={title}
                    >
                        {info}
                    </Button>
                    <div className={`${isOpen ? "block" : "hidden"} w-full`}>
                        {!isClosed && component}
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={"flex flex-col justify-start items-start gap-[24px]"}>
            {renderAccordion()}
            <DefaultAlert
                isOpen={alertState.isOpen}
                message={alertState.message}
                status={alertState.status}
                onClose={closeAlert}
            />
        </div>
    );
};

export default Content;
