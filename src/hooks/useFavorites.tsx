import favoritesService from "@/services/favoritesService";
import { getIsFavoriteProduct } from "@/store/selectors/favoritesSelector";
import {
    setFavoritesData, setFavoritesProducts,
} from "@/store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

function useFavorites(id: number) {
    const dispatch = useAppDispatch();
    const page = useAppSelector(({ favorites }) => favorites.data.pageNumber);
    const currentProduct = useAppSelector(state => getIsFavoriteProduct(state, id));

    async function toggleProductFavorites() {
        if (currentProduct) {
            return await deleteProductFromFavorites();
        } else {
            return await addProductToFavorites();
        }
    }

    async function getFavoritesProducts() {
        const response = await favoritesService.getFavoritesProducts(page ? { params: { page } } : {});

        if (response.status === 200) {
            dispatch(setFavoritesData(response.data));
        }

        return response;
    }

    async function addProductToFavorites() {
        const response = await favoritesService.addFavoritesProducts({ id });

        if (response.status === 200) {
            dispatch(setFavoritesProducts(response.data));
        }

        return response;
    }

    async function deleteProductFromFavorites() {
        const response = await favoritesService.deleteFavoritesProducts(id);

        if (response.status === 200) {
            await getFavoritesProducts();
        }

        return response;
    }

    return {
        currentProduct,
        toggleProductFavorites,
        addProductToFavorites,
        deleteProductFromFavorites,
    };
}

export default useFavorites;
