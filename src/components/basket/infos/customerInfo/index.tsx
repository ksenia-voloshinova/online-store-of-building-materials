import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import { useAppSelector } from "@/store/store";

const CustomerInfo: FC = () => {
    const { firstName, lastName, email, phone } = useAppSelector(({ basket }) => basket.sections.customer.customerData);

    return (
        <>
            {firstName && (
                <>
                    <p>
                        <span>{firstName} {lastName}</span>
                        {email && <span>, {email}</span>}
                        {phone && <span>, {phone}</span>}
                    </p>
                    <EditIcon className={"min-w-[20px]"} />
                </>
            )}
        </>
    );
};

export default CustomerInfo;
