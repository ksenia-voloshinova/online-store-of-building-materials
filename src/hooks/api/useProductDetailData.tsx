import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { fetchProductDetail } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IProductDetail } from "@/types/productDetail";

const useProductDetailData = () => {
    const router = useRouter();
    const path = router.asPath.replace("/catalog/", "");

    return useQuery<IProductDetail, Error>(
        QUERY_KEYS.productDetail,
        () => fetchProductDetail(path),
        {
            staleTime: 0,
            cacheTime: 0,
        }
    );
};

export default useProductDetailData;