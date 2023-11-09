import { useQuery } from "react-query";

import { fetchPartners } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IPartner } from "@/types";

const usePartners = () => {
    return useQuery<IPartner[], Error>(
        QUERY_KEYS.partners,
        () => fetchPartners()
    );
}; 

export default usePartners;