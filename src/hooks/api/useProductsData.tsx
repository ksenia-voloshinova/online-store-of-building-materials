import { useQuery } from "react-query";

import { fetchProducts } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProduct } from "@/types/production";

const useProductsData = (value: string) => {
    return useQuery<IProduct[], Error>(
        [QUERY_KEYS.productsSearch, value],
        () => fetchProducts(value),
        {
            enabled: !!value
        }
    );
};

export default useProductsData;