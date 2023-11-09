import basketService from "@/services/basketService";
import { setBasket, setSectionsActive } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

function useBasketErrors() {
    const dispatch = useAppDispatch();
    const sectionsState = useAppSelector(({ basket }) => basket.sectionsState);
    const sections = useAppSelector(({ basket }) => basket.sections);
    const headerHeight = 160;

    async function validateErrors() {
        if (shippingErrors()) {
            dispatch(setSectionsActive("shipping"));
            window.scrollTo({
                behavior: "smooth",
                top: sectionsState.shipping.position.y - headerHeight
            });

            return {
                status: 409,
                errors: shippingErrors(),
                data: {},
                message: "Необходимо заполнить все данные по доставке"
            };
        } else if (customerErrors()) {
            dispatch(setSectionsActive("customer"));
            window.scrollTo({
                behavior: "smooth",
                top: sectionsState.customer.position.y - headerHeight
            });

            return {
                status: 409,
                errors: customerErrors(),
                data: {},
                message: "Необходимо заполнить все личные данные"
            };
        } else {
            const { status, data } = await basketPayment();

            return {
                status,
                errors: false,
                data: data,
                message: data?.message,
            };
        }
    }

    async function basketPayment() {
        const response = await basketService.basketPayment(sections);

        if (response.status === 200) {
            dispatch(setBasket({
                products: [],
                info: {
                    fullPrice: 0,
                    volume: 0,
                    weight: 0,
                    count: 0,
                }
            }));
        }

        return response;
    }

    function shippingErrors() {
        return Object.entries(sections.shipping.shippingData)
            .reduce<boolean[]>((acc, [key, value]) => {
                if (key === "city" || key === "street") {
                    return [...acc, !!value];
                }

                return acc;
            }, [])
            .some(data => !data);
    }

    function customerErrors() {
        return Object.entries(sections.customer.customerData)
            .reduce<boolean[]>((acc, [key, value]) => {
                return [...acc, !!value];
            }, [])
            .some(data => !data);
    }

    return {
        validateErrors
    };
}

export default useBasketErrors;
