import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchProductDetailInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductDetailInfo } from "@/types/productDetail";

const useProductDetailInfoData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");
    
    return useQuery<IProductDetailInfo, Error>(
        QUERY_KEYS.productDetailInfo,
        () => fetchProductDetailInfo(path),
        {
            staleTime: 60 * 60 * 1000,
            cacheTime: 60 * 60 * 1000,
        }
    );
};

export default useProductDetailInfoData;