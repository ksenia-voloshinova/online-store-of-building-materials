import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import SubscriptionForm from "@/shared/forms/subscriptionForm";

const Info: FC = () => {
    return (
        <div className={"container py-containerXl w-full md:w-5/12 bg-yellowWarm"}>
            <div className={"mb-[25px]"}>
                <Link href={"/"}>
                    <a>
                        <Image
                            alt={"logo"}
                            height={84}
                            src={"/static/dtm-dom-logo-white.png"}
                            width={199}
                        />
                    </a>
                </Link>
            </div>
            <div className={"mb-[60px] flex flex-col items-center"}>
                <SubscriptionForm />
                <a className={"text-white text-[20px] leading-[16px] tracking-[-0.02em]"}
                    href="tel:84957440242"
                >
                    +7 (495) 744-02-42
                </a>
            </div>
            <p className={"block text-white text-sm"}>
                Москва, Головинское ш., <br/> д. 5, стр. 1 (БЦ Водный)
            </p>
        </div>
    );
};

export default Info;
