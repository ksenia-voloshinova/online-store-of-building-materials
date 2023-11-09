import compareService from "@/services/compareService";
import { getIsCompareProduct } from "@/store/selectors/compareSelector";
import { setCompareProducts } from "@/store/slices/compareSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

function useCompare(id: number, elementId: number) {
    const dispatch = useAppDispatch();
    const currentProduct = useAppSelector(state => getIsCompareProduct(state, id));

    async function toggleProductCompare() {
        if (currentProduct) {
            return await deleteProductFromCompare();
        } else {
            return await addProductToCompare();
        }
    }

    async function addProductToCompare() {
        const response = await compareService.addCompareProducts({
            productId: id,
            elementId
        });

        if (response.status === 200) {
            dispatch(setCompareProducts(response.data));
        }

        return response;
    }

    async function deleteProductFromCompare() {
        const response = await compareService.deleteCompareProducts(elementId, id);

        if (response.status === 200) {
            dispatch(setCompareProducts(response.data));
        }

        return response;
    }

    return {
        currentProduct,
        toggleProductCompare,
        addProductToCompare,
        deleteProductFromCompare,
    };
}

export default useCompare;
