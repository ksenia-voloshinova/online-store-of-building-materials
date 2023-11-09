
import { useQuery } from "react-query";

import { fetchDefaultAddress } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IAddress } from "@/types/profile";

const useDefaultAddressData = () => {
    return (
        useQuery<IAddress, Error>(QUERY_KEYS.defaultAddresses, fetchDefaultAddress)
    );
};

export default useDefaultAddressData;