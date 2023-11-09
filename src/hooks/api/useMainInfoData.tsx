import { useQuery } from "react-query";

import { fetchMainInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IMainInfo } from "@/types/main";

const useMainInfoData = () => {
    return useQuery<IMainInfo, Error>(
        QUERY_KEYS.infoMain,
        () => fetchMainInfo()
    );
};

export default useMainInfoData;
