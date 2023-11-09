import { FC } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

import Content from "@/components/main/advantages/Content";
import Background from "@/components/main/background";
import useMainInfoData from "@/hooks/api/useMainInfoData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const Advantages: FC = () => {
    const { isLoading, isFetching, isError, data } = useMainInfoData();

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить преимущества компании"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"relative w-full mdMax:h-full h-[1700px] overflow-hidden md:overflow-visible"}>
                <ParallaxBanner
                    className={"h-full !overflow-visible"}
                    layers={[
                        {
                            className: "mdMax:!transform-none mdMax:!inset-[0px]",
                            children: <Background image={data?.advantages.image} />,
                            speed: 10,
                        },
                        {
                            className: "mdMax:!relative mdMax:!transform-none",
                            children: <Content data={data?.advantages.data ?? []} />,
                            speed: -15,
                            expanded: false,
                        }
                    ]}
                />
            </div>
        </Interceptor>
    );
};

export default Advantages;
