import { useQuery } from "react-query";

import { fetchProduction } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductionCatalog } from "@/types/production";

const useProductionCatalogData = () => {
    return useQuery<IProductionCatalog[], Error>(
        QUERY_KEYS.productionCatalog,
        fetchProduction,
        {
            staleTime: 60 * 60 * 1000,
            cacheTime: 60 * 60 * 1000,
        }
    );
};

export default useProductionCatalogData;