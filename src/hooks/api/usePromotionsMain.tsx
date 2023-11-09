import { useQuery } from "react-query";

import { fetchPromotionsMain } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IPromotion } from "@/types";

const usePromotionsMain = () => {
    return useQuery<IPromotion[], Error>(
        QUERY_KEYS.promotionsMain,
        () => fetchPromotionsMain()
    );
};

export default usePromotionsMain;