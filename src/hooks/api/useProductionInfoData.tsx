import { useQuery } from "react-query";

import { fetchCatalogSectionsInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductionInfo } from "@/types/production";

const useProductionInfoData = () => {
    return useQuery<IProductionInfo, Error>(
        QUERY_KEYS.productionInfo,
        fetchCatalogSectionsInfo,
        {
            staleTime: 60 * 60 * 1000,
            cacheTime: 60 * 60 * 1000,
        }
    );
}; 

export default useProductionInfoData;