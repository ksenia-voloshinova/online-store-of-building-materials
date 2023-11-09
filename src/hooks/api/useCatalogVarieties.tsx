import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCatalogVarieties } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IVariateCatalog } from "@/types/catalog";

const useCatalogVarieties = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");

    return useQuery<IVariateCatalog[], Error>(
        QUERY_KEYS.varieties,
        () => fetchCatalogVarieties(path)
    );
};

export default useCatalogVarieties;