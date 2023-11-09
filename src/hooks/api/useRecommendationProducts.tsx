import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchRecommendationProducts } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductCatalog } from "@/types/catalog";

const useRecommendationProducts = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");

    return useQuery<IProductCatalog[], Error>(
        QUERY_KEYS.recommendation,
        () => fetchRecommendationProducts(path, {})
    );
};

export default useRecommendationProducts;
