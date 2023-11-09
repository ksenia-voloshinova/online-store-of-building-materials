import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCatalogSorts } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { ISort } from "@/types/catalog";

const useSortsData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");
    
    return useQuery<ISort[], Error>(
        QUERY_KEYS.sorts,
        () => fetchCatalogSorts(path)
    );
};

export default useSortsData;