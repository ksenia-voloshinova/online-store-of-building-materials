import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Fade from "react-reveal/Fade";
import { useParallax } from "react-scroll-parallax";

import Arrow from "@/assets/icons/arrow-top-right.svg";
import useMainInfoData from "@/hooks/api/useMainInfoData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";

const Employees: FC = () => {
    const { isLoading, isFetching, isError, data } = useMainInfoData();
    const employees = data?.employees;
    const largeInfo = employees?.data.slice(0, 2);
    const smallInfo = employees?.data.slice(2, 4);
    const parallax = useParallax<HTMLDivElement>({
        translateY: [-5, 5, "easeIn"],
    });

    function renderLarge() {
        return largeInfo?.map((info, index) => {
            const { id, value, title } = info;

            return (
                <div
                    key={id}
                    className={"p-[25px] flex flex-col justify-between h-[245px] xl:h-[480px] " +
                        "first:bg-white last:bg-yellowWarm"}
                >
                    <Fade bottom>
                        <p className={`text-[28px] md:text-[59px] xl:text-[93px] 
                    ${index === 0 ? "text-yellowWarm" : "text-blueMagentaDark"}`}
                        >
                            {value}
                        </p>
                    </Fade>
                    <div
                        className={"text-sm xl:text-[20px]"}
                        dangerouslySetInnerHTML={{ __html: title ?? "" }}
                    />
                </div>
            );
        });
    }

    function renderSmall() {
        return smallInfo?.map(info => {
            const { id, value, title } = info;

            return (
                <div
                    key={id}
                    className={"p-[25px] flex flex-col justify-between h-[245px] xl:h-[340px] " +
                    "bg-blueMagentaDark border-[0.4px] border-blueMagentaDarkLight md:border-none"}
                >
                    <Fade bottom>
                        <p className={"text-yellowWarm text-[28px] md:text-[59px]"}>{value}</p>
                    </Fade>
                    <div
                        className={"text-white text-sm"}
                        dangerouslySetInnerHTML={{ __html: title ?? "" }}
                    />
                </div>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить информацию по сотрудникам компании"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div className={"flex flex-col md:flex-row"}>
                <div className={"container py-[20px] bg-blueMagentaDark md:hidden"}>
                    <Fade bottom>
                        <p className={"text-[32px] text-white font-medium"}>
                            Команда
                        </p>
                    </Fade>
                </div>
                <Link href={employees?.link.href ?? "#"}>
                    <a className={"group block relative w-full h-[320px] md:max-w-[600px] sm:h-[400px] md:h-[600px]"}>
                        <div className={"absolute z-[10] w-full h-full bg-black opacity-30"} />
                        <Image
                            alt={employees?.title}
                            layout={"fill"}
                            objectFit={"cover"}
                            src={employees?.image ?? ""}
                        />
                        <div className={"container py-[30px] relative z-[10] flex flex-col justify-between h-full"}>
                            <div
                                className={"font-medium text-white text-[24px] md:text-[36px]"}
                                dangerouslySetInnerHTML={{ __html: employees?.title ?? "" }}
                            />
                            <div className={"flex flex-col gap-[10px] w-max"}>
                                <div className={"p-[10px] flex justify-center items-center w-[50px] h-[50px] " +
                                    "bg-yellowWarm rounded-[50%]"}
                                >
                                    <Arrow className={"fill-black group-hover:rotate-45 duration-[200ms]"} />
                                </div>
                                <p className={"text-white text-sm"}>{employees?.link.title}</p>
                            </div>
                        </div>
                    </a>
                </Link>
                <div
                    ref={parallax.ref}
                    className={"flex flex-row md:flex-col xl:flex-row w-full mdMax:!transform-none"}
                >
                    <div className={"w-1/2 md:w-full 2xl:w-3/5"}>{renderLarge()}</div>
                    <div className={"w-1/2 md:w-full 2xl:w-2/5"}>{renderSmall()}</div>
                </div>
            </div>
        </Interceptor>
    );
};

export default Employees;
