import { useQuery } from "react-query";

import { fetchRegions } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IRegions } from "@/types";

const useRegionsData = () => {
    return useQuery<IRegions, Error>(
        QUERY_KEYS.regions,
        fetchRegions
    );
};

export default useRegionsData;