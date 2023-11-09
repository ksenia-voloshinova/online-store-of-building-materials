import Link from "next/link";
import { FC } from "react";
import Fade from "react-reveal/Fade";

import Arrow from "@/assets/icons/arrow-top-right.svg";
import { ILink } from "@/types/main";

interface IContent {
    link: ILink | undefined;
    title: string;
    subtitle: string;
}

const Content: FC<IContent> = ({ title, subtitle, link }) => {
    return (
        <div className={"py-[30px] relative z-10 flex flex-col gap-[24px] container"}>
            <div className={"flex flex-col gap-[4px]"}>
                <Fade bottom delay={1000}>
                    <div
                        dangerouslySetInnerHTML={{ __html: title ?? "" }}
                        className={`first-line:text-yellowWarm overflow-hidden
                        text-white text-3xl md:text-5xl transform transition duration-[400ms]`}
                    />
                </Fade>
                <Fade bottom delay={1500}>
                    <div
                        dangerouslySetInnerHTML={{ __html: subtitle ?? "" }}
                        className={"text-white text-sm md:text-lg-bold overflow-hidden " +
                            "transform transition duration-[400ms] !leading-[20px]"}
                    />
                </Fade>
            </div>
            <Link href={link?.href ?? "#"}>
                <a
                    className={"group flex flex-col justify-between p-[10px] w-[120px] h-[120px] " +
                        "md:p-[30px] md:w-[200px] md:h-[200px] bg-yellowWarm " +
                        "hover:bg-blueMagentaDark duration-[400ms]"}
                >
                    <div className={"flex justify-center items-center self-end w-[36px] h-[36px] " +
                        "md:w-[43px] md:h-[43px] rounded-[50%] bg-blueMagentaDark " +
                        "group-hover:rotate-45 duration-[200ms]"}
                    >
                        <Arrow className={"fill-white"} />
                    </div>
                    <p className={"text-xs md:text-[16px] text-black group-hover:text-white " +
                        "duration-[200ms]"}
                    >
                        {link?.title}
                    </p>
                </a>
            </Link>
        </div>
    );
};

export default Content;
