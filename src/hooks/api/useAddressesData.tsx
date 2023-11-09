
import { useQuery } from "react-query";

import { fetchGetAddresses } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IAddress } from "@/types/profile";

const useAddressesData = () => {
    return (
        useQuery<IAddress[], Error>(QUERY_KEYS.addresses, fetchGetAddresses)
    );
};

export default useAddressesData;