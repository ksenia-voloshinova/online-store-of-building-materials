import { useQuery } from "react-query";

import { fetchPaymentTypes } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { IPaymentType } from "@/types/basket";

const usePaymentTypes = () => {
    return (
        useQuery<IPaymentType[], Error>(QUERY_KEYS.paymentTypes, fetchPaymentTypes)
    );
};

export default usePaymentTypes;
