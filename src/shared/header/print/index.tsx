import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Print: FC = () => {
    return (
        <header className={"hidden print:flex justify-between items-center"}>
            <Link href={"/"}>
                <a>
                    <Image
                        alt={"logo"}
                        height={65}
                        src={"/static/dtm-logo-black.svg"}
                        width={258}
                    />
                </a>
            </Link>
            <div className={"hidden print:block text-sm"}>
                ООО «Дёке Трейд Маркетинг» <br/>
                125212, г. Москва, Головинское шоссе <br/>
                дом 5, корпус 1, этаж 3, пом. 3057
            </div>
        </header>
    );
};

export default Print;
