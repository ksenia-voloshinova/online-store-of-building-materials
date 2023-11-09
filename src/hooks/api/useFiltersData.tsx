import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCatalogFilters } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import paramsService from "@/services/paramsService";
import { TFilter } from "@/types/catalog";

const useFiltersData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");
    const params = paramsService.getParamsObject();

    return useQuery<TFilter, Error>(
        QUERY_KEYS.filters,
        () => fetchCatalogFilters(path, { params }),
    );
};

export default useFiltersData;