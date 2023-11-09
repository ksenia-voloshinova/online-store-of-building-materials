import { FC } from "react";
import Fade from "react-reveal/Fade";
import { ParallaxBanner } from "react-scroll-parallax";

import Background from "@/components/main/background";
import Content from "@/components/main/banner/Content";
import useMainInfoData from "@/hooks/api/useMainInfoData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const Banner: FC = () => {
    const { isLoading, isFetching, isError, data } = useMainInfoData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить баннер"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"w-full h-[400px] md:h-[522px] lg:h-[calc(100vh-138px)]"}
            >
                <ParallaxBanner
                    className={"h-full"}
                    layers={[
                        {
                            children: <Fade bottom><Background image={data?.banner.image} /></Fade>,
                            speed: 10
                        },
                        {
                            children: (
                                <Fade bottom>
                                    <Content
                                        link={data?.banner.link}
                                        subtitle={data?.banner.subtitle ?? ""}
                                        title={data?.banner.title ?? ""}
                                    />
                                </Fade>
                            ),
                            speed: -15,
                            expanded: false,
                        }
                    ]}
                />
            </div>
        </Interceptor>
    );
};

export default Banner;
