import { FC } from "react";

import useProductionInfoData from "@/hooks/api/useProductionInfoData";
import Interceptor from "@/shared/interceptor";

const Info: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductionInfoData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить дополнительную ифнормацию по странице"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {data?.info && (
                <div className={"container container-width mt-[54px] 3xl:pt-[80px] mb-[36px] flex gap-[30px] flex-col"}>
                    <p
                        dangerouslySetInnerHTML={{ __html: data?.info.large.title ?? "" }}
                        className={"text-cyanBlueCool text-lg-bold md:text-[24px] " +
                            "leading-[27px] tracking-[-0.3px]"}
                    />
                    <p
                        dangerouslySetInnerHTML={{ __html: data?.info.small.title ?? "" }}
                        className={"self-end md:w-2/3 " +
                            "text-cyanBlueCool text-sm md:text-[18px] leading-[22px] tracking-[-0.3px]"}
                    />
                </div>
            )}
        </Interceptor>
    );
};

export default Info;
