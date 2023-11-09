import basketService from "@/services/basketService";
import { getBasketProduct } from "@/store/selectors/basketSelector";
import { setBasket } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { INewBasketProduct } from "@/types/basket";

function useBasket(id: number) {
    const dispatch = useAppDispatch();
    const currentProduct = useAppSelector((state) => getBasketProduct(state, id));

    async function addProduct(currentCount: number) {
        if (currentProduct) {
            return await updateProduct(currentProduct.id, currentCount);
        } else {
            return await createProduct({ id, count: 1 });
        }
    }

    async function deleteProduct(currentCount: number) {
        if (!currentProduct) return;

        if (currentCount > 0) {
            return await updateProduct(currentProduct.id, currentCount);
        } else {
            return await deleteTotalProduct();
        }
    }

    async function updateProduct(id: number, count: number) {
        const response = await basketService.updateProduct(id, count);

        if (response.status === 200) {
            dispatch(setBasket(response.data));
        }

        return response;
    }

    async function createProduct(product: INewBasketProduct) {
        const response = await basketService.createProduct(product);

        if (response.status === 200) {
            dispatch(setBasket(response.data));
        }

        return response;
    }

    async function deleteTotalProduct() {
        const response = await basketService.deleteProduct(id);

        if (response.status === 200) {
            dispatch(setBasket(response.data));
        }

        return response;
    }

    async function resetBasket() {
        const response = await basketService.resetBasket();

        if (response.status === 200) {
            dispatch(setBasket(response.data));
        }

        return response;
    }

    return {
        currentProduct,
        addProduct,
        deleteProduct,
        deleteTotalProduct,
        resetBasket
    };
}

export default useBasket;
