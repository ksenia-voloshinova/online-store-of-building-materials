import Link from "next/link";
import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import useDefaultAddressData from "@/hooks/api/useDefaultAddressData";
import { ROUTES } from "@/routes";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const Address: FC = () => {
    const { isError, isLoading, isFetching, data } = useDefaultAddressData();

    return (
        <div className={"w-full"}>
            <div className={"pb-[10px] flex justify-between border-b-1 border-cyanBlueMiddle"}>
                <p className={"font-bold"}>Адрес доставки</p>
                <Link href={ROUTES.addresses}>
                    <a className={"cursor-pointer"}><EditIcon /></a>
                </Link>
            </div>
            <div className={"pt-[15px] flex flex-col gap-[8px]"}>
                <Interceptor
                    errorMessage={"Не удалось загрузить адрес"}
                    isError={isError}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    loader={<Loader height={40} width={40} />}
                >
                    <p>{data?.city}</p>
                    <p>ул. {data?.street}{data?.house && <span>, {data?.house}</span>}</p>
                    {data?.apartment &&  <p>кв. (офис) {data?.apartment}</p>}
                </Interceptor>
            </div>
        </div>
    );
};

export default Address;