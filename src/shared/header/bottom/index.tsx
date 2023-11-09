import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import Categories from "@/shared/header/bottom/Categories";
import MenuMobile from "@/shared/menuMobile";
import Search from "@/shared/productSearch/index";

import Menu from "./Menu";

const Bottom: FC = () => {
    return (
        <div className={"container pl-[10px] flex items-center justify-between gap-[10px] md:gap-[30px]"}>
            <div className={"min-w-[258px]"}>
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
            </div>
            <div className={"md:hidden"}>
                <MenuMobile />
            </div>
            <div className={"hidden md:flex pt-[12px] pb-[16px] items-center gap-[30px] w-full"}>
                <div className={"flex gap-[10px] w-full"}>
                    <Categories />
                    <Search />
                </div>
                <div className={"hidden xl:block"}>
                    <Menu />
                </div>
            </div>
        </div>
    );
};

export default Bottom;
