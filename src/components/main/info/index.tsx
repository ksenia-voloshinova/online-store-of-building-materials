import { FC, useEffect, useRef, useState } from "react";
import { useParallax } from "react-scroll-parallax";

import Plus from "@/assets/icons/circle-plus.svg";
import useMainInfoData from "@/hooks/api/useMainInfoData";
import useWindowSize from "@/hooks/useWindowSize";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import getArrayFromNumber from "@/utils/getArrayFromNumber";

const Info: FC = () => {
    const { isLoading, isFetching, isError, data } = useMainInfoData();
    const infoRef = useRef<HTMLUListElement>(null);
    const { width } = useWindowSize();
    const [isVisible, setIsVisible] = useState(false);
    const parallaxSecond = useParallax<HTMLLIElement>({
        translateY: [-5, 10, "easeIn"],
    });
    const parallaxFourth = useParallax<HTMLLIElement>({
        translateY: [-5, 10, "easeIn"],
    });

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    function onScroll() {
        const top = infoRef?.current?.getBoundingClientRect().top ?? 0;

        if (top < (window.innerHeight - 100)) {
            setIsVisible(true);
        }
    }

    function renderProgress(num: number) {
        return getArrayFromNumber(num).map(n => {
            return <div key={n} className={"text-yellowWarm text-[40px] md:text-[64px]"}>{n}</div>;
        });
    }

    function renderInfo() {
        return data?.info.map((info, index) => {
            const { title, desc } = info;
            const key = index + 1;

            return (
                <li
                    key={key}
                    ref={key === 2 ? parallaxSecond.ref : key === 4 ? parallaxFourth.ref : undefined}
                    className={`overflow-hidden group border-[0.4px] border-blueMagentaDarkLight
                    h-[245px] sm:h-[300px] md:h-[392px] lgMax:!transform-none`}
                >
                    <div
                        className={"container py-[30px] flex flex-col justify-between w-full h-full bg-blueMagentaDark"}
                    >
                        <div className={"max-h-[100px] overflow-hidden"}>
                            {(width ?? 0) < 768 ? (
                                <div className={"text-yellowWarm text-[40px] md:text-[64px]"}>{key}</div>
                            ) : (
                                <div
                                    className={"duration-[700ms]"}
                                    style={{ transform: `translateY(${isVisible ? `-${index * 100}px` :  "0px"})` }}
                                >
                                    {renderProgress(key)}
                                </div>
                            )}
                        </div>
                        <Plus className={"self-center hidden sm:block"} />
                        <p className={"text-white text-sm"}>{title}</p>
                    </div>
                    <div className={`text-red opacity-0 translate-y-[0px] duration-[300ms] 
                    container py-[30px] flex flex-col justify-between w-full h-full bg-white 
                    group-hover:opacity-100 group-hover:translate-y-[-100%]`}
                    >
                        <div className={"text-blueMagenta text-xs md:text-sm"}>{desc}</div>
                        <p className={"text-black text-sm"}>{title}</p>
                    </div>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить информацию о компании"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <ul ref={infoRef} className={"relative z-[100] grid grid-rows-2 grid-cols-2 " +
                "lg:grid-rows-1 lg:grid-cols-4 lg:h-[390px]"}>
                {renderInfo()}
            </ul>
        </Interceptor>
    );
};

export default Info;
