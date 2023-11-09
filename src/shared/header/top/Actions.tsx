import Link from "next/link";
import { FC, ReactNode } from "react";

import User from "@/assets/icons/user.svg";
import BasketLink from "@/shared/basketLink";
import CompareLink from "@/shared/compareLink";
import FavoriteLink from "@/shared/favoriteLink";
import MenuMobile from "@/shared/menuMobile";
import { ACTIONS } from "@/utils/constants";

const Actions: FC = () => {
    const icons: {
        [type: string]: ReactNode;
    } = {
        fav: <FavoriteLink className={`stroke-cyanBlueGray transition ease-in-out 
            group-hover/fav:stroke-yellowWarm duration-[300ms]`} />,
        compare: <CompareLink className={`fill-cyanBlueGray transition ease-in-out 
            group-hover/compare:fill-yellowWarm duration-[300ms]`} />,
        cart: <BasketLink className={`fill-cyanBlueGray transition ease-in-out 
            group-hover/cart:fill-yellowWarm duration-[300ms]`} />,
        user: <User className={`fill-cyanBlueGray transition ease-in-out 
            group-hover/user:fill-yellowWarm duration-[300ms]`} />
    };

    function renderActions() {
        return ACTIONS.map(action => {
            const { type, title, link } = action;

            return (
                <Link key={type} href={link}>
                    <button className={`group/${type} flex flex-col items-center 
                hover:text-yellowWarm duration-[300ms] text-sm text-cyanBlueDark`}
                    >
                        {icons[type]}
                        {title}
                    </button>
                </Link>
            );
        });
    }

    return (
        <div className={"flex gap-[10px] xl:gap-[17px]"}>
            <div className={"hidden lg:flex gap-[10px] xl:gap-[17px]"}>
                {renderActions()}
            </div>
            <div className={"xl:hidden"}>
                <MenuMobile />
            </div>
        </div>
    );
};

export default Actions;
