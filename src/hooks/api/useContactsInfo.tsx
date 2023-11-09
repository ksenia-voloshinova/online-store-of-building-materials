import { useQuery } from "react-query";

import { fetchContacts, fetchContactsInfo, fetchGetCompare } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import { ICompareGroup } from "@/types/compare";
import { IContactsInfo, IContactsInfoItem } from "@/types/contacts";

const useContactsInfo = () => {

    return useQuery<IContactsInfo, Error>(
        QUERY_KEYS.contactsMain,
        () => fetchContacts()
    );
};

export default useContactsInfo;
