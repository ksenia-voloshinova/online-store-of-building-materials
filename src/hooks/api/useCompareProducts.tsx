import { useQuery } from "react-query";

import { fetchGetCompare } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { ICompareGroup } from "@/types/compare";

const useCompareProducts = () => {

    return useQuery<ICompareGroup[], Error>(
        QUERY_KEYS.compare,
        () => fetchGetCompare()
    );
};

export default useCompareProducts;
