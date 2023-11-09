import { FC } from "react";

import useProductionInfoData from "@/hooks/api/useProductionInfoData";
import Interceptor from "@/shared/interceptor";

const Banner: FC = () => {
    const { isLoading, isFetching, isError, data: info } = useProductionInfoData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить баннер"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <div className={"relative w-full " +
                "pt-[24px] min-h-[320px] md:min-h-[540px] " +
                "2xl:pt-[53px] 2xl:min-h-[370px] " +
                "3xl:pt-[90px] 3xl:min-h-[463px] "}
            >
                <picture
                    className="absolute top-[0px] bottom-[0px] w-full h-full object-cover"
                >
                    <source
                        media="(min-width: 1024px)"
                        srcSet={info?.banner.image.desktop}
                    />
                    <source
                        media="(min-width: 768px), (min-aspect-ratio: 13 / 9)"
                        srcSet={info?.banner.image.table}
                    />
                    <img
                        alt="bc"
                        className={"w-full h-full object-cover"}
                        src={info?.banner.image.mobile}
                    />
                </picture>
                <div className={"relative z-10 container"}>
                    <p 
                        className={"text-yellowWarm text-sm md:text-lg-bold"}
                        dangerouslySetInnerHTML={{ __html: info?.banner.title ?? "" }}
                    />
                    <p 
                        className={"max-w-[341px] text-white text-3xl md:text-5xl"}
                        dangerouslySetInnerHTML={{ __html: info?.banner.subtitle ?? "" }} 
                    />
                </div>
            </div>
        </Interceptor>
    );
};

export default Banner;