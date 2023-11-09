import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchPromotionsCatalog } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IPromotion } from "@/types";

const usePromotionsData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");
    
    return useQuery<IPromotion[], Error>(
        QUERY_KEYS.promotions,
        () => fetchPromotionsCatalog(path)
    );
};

export default usePromotionsData;