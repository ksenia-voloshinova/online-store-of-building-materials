import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCatalogInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { ICatalogInfo } from "@/types/catalog";

const useCatalogInfoData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");

    return (
        useQuery<ICatalogInfo, Error>(
            QUERY_KEYS.catalogInfo,
            () => fetchCatalogInfo(path),
            {
                staleTime: 60 * 60 * 1000,
                cacheTime: 60 * 60 * 1000,
            }
        )
    );
};

export default useCatalogInfoData;