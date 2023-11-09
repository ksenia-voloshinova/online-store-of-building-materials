import { FC } from "react";

import Arrow from "@/assets/icons/arrow-top-right.svg";
import Dealer from "@/shared/dealer";
import Supplier from "@/shared/supplier";

const Links: FC = () => {
    return (
        <ul className={"p-containerSm sm:p-0 flex flex-col gap-[24px] " +
            "bg-yellowWarm sm:bg-[transparent]"}
        >
            <li>
                <Dealer>
                    <div
                        className={"flex gap-[10px] items-center text-xs text-white " +
                            "leading-[15px] tracking-[-0.02em] " +
                            "duration-[300ms] hover:text-blueMagentaDark " +
                            "sm:hover:text-yellowWarm w-max"}
                    >
                        <div className={"flex justify-center items-center bg-white " +
                            "w-[48px] h-[48px] rounded-[50%]"}>
                            <Arrow className={"fill-black"} />
                        </div>
                        Стать дилером
                    </div>
                </Dealer>
            </li>
            <li>
                <Supplier>
                    <div
                        className={"flex gap-[10px] items-center text-xs text-white " +
                            "leading-[15px] tracking-[-0.02em] " +
                            "duration-[300ms] hover:text-blueMagentaDark " +
                            "sm:hover:text-yellowWarm w-max"}
                    >
                        <div className={"flex justify-center items-center bg-white " +
                            "w-[48px] h-[48px] rounded-[50%]"}>
                            <Arrow className={"fill-black"} />
                        </div>
                        Стать поставщиком
                    </div>
                </Supplier>
            </li>
            <li>
                <a
                    href={"https://b2b.docke.ru/"}
                    rel="noreferrer"
                    target={"_blank"}
                    className={"flex gap-[10px] items-center text-xs text-white " +
                        "leading-[15px] tracking-[-0.02em] " +
                        "duration-[300ms] hover:text-blueMagentaDark " +
                        "sm:hover:text-yellowWarm w-max"}
                >
                    <div className={"flex justify-center items-center bg-white " +
                        "w-[48px] h-[48px] rounded-[50%]"}>
                        <Arrow className={"fill-black"} />
                    </div>
                    B2B портал
                </a>
            </li>
        </ul>
    );
};

export default Links;
