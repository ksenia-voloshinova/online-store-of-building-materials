import { useQuery } from "react-query";

import { fetchGlobalInfo, fetchMainInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IGlobalInfoData } from "@/types/info";
import { IMainInfo } from "@/types/main";

const useGlobalData = () => {

    return useQuery<IGlobalInfoData, Error>(
        QUERY_KEYS.globalInfo,
        () => fetchGlobalInfo()
    );
};

export default useGlobalData;
