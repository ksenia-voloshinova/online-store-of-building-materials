import { FC } from "react";

import Dealer from "@/shared/dealer";
import Supplier from "@/shared/supplier";

const Links: FC = () => {
    return (
        <ul className={"flex"}>
            <li>
                <Dealer>
                    <div
                        className={`block
                        px-containerSm md:px-containerMd 2xl:px-containerXl
                        py-[16px] 2xl:py-[24px] 
                        text-xs text-blueMagenta hover:text-blueMagentaDark
                        leading-[15px] tracking-[-0.02em]
                        border-r-1 border-superSilver
                        duration-[400ms] text-left
                        `}
                    >
                        Стать дилером
                    </div>
                </Dealer>
            </li>
            <li>
                <Supplier>
                    <div
                        className={`block
                        px-containerSm md:px-containerMd 2xl:px-containerXl
                        py-[16px] 2xl:py-[24px] 
                        text-xs text-blueMagenta hover:text-blueMagentaDark
                        leading-[15px] tracking-[-0.02em]
                        border-r-1 border-superSilver
                        duration-[400ms] text-left
                        `}
                    >
                        Стать поставщиком
                    </div>
                </Supplier>
            </li>
            <li>
                <a
                    href={"https://b2b.docke.ru/"}
                    rel="noreferrer"
                    target={"_blank"}
                    className={`block
                        px-containerSm md:px-containerMd 2xl:px-containerXl
                        py-[16px] 2xl:py-[24px] 
                        text-xs text-blueMagenta hover:text-blueMagentaDark
                        leading-[15px] tracking-[-0.02em]
                        border-r-1 border-superSilver
                        duration-[400ms] text-left
                        `}
                >
                    B2B портал
                </a>
            </li>
        </ul>
    );
};

export default Links;