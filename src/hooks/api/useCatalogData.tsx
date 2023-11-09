import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCatalog } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import paramsService from "@/services/paramsService";
import { useAppSelector } from "@/store/store";
import { ICatalog } from "@/types/catalog";

const useCatalogData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "").split("/?")[0];
    const page = useAppSelector(({ catalog }) => catalog.page);
    const sort = useAppSelector(({ catalog }) => catalog.sort);
    const filters = useAppSelector(({ catalog }) => catalog.filters);
    const pageParam = +paramsService.getParam("page");

    return useQuery<ICatalog, Error>(
        [QUERY_KEYS.catalog, filters, page, sort],
        () => fetchCatalog(path, {
            params: {
                ...filters,
                page: page !== pageParam ? pageParam : page,
                sort
            }
        })
    );
};

export default useCatalogData;
