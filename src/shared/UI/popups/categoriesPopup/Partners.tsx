import Image from "next/image";
import { FC } from "react";

import usePartners from "@/hooks/api/usePartners";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const Partners: FC = () => {
    const { isLoading, isFetching, isError, data: partners } = usePartners();

    function renderPartners() {
        return partners?.map(partner => {
            const { id, image, name, link } = partner;

            return (
                <li key={id} className={"w-[135px] h-max"}>
                    <a href={link ?? "#"} target={"_blank"}>
                        <Image alt={name} height={50} objectFit={"contain"} src={image} width={135} />
                    </a>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить партнеров"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <ul className={"p-[20px] pt-[80px] lg:p-[60px] lg:pt-[100px] flex flex-wrap " +
                "justify-between md:justify-start md:flex-col gap-[17px] lg:gap-[50px] bg-yellowWarm"}
            >
                {renderPartners()}
            </ul>
        </Interceptor>
    );
};

export default Partners;
