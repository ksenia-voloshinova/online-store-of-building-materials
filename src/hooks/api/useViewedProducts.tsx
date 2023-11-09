import { useQuery } from "react-query";

import { fetchViewedProducts } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductCatalog } from "@/types/catalog";

const useViewedProducts = () => {
    return useQuery<IProductCatalog[], Error>(
        QUERY_KEYS.viewed,
        fetchViewedProducts
    );
};

export default useViewedProducts;