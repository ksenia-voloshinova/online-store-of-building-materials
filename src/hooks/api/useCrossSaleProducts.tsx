import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchCrossSaleProducts } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductCatalog } from "@/types/catalog";

const useCrossSaleProducts = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");

    return useQuery<IProductCatalog[], Error>(
        QUERY_KEYS.crossSale,
        () => fetchCrossSaleProducts(path, {})
    );
};

export default useCrossSaleProducts;
