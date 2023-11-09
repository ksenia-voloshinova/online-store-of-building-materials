import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import User from "@/assets/icons/user.svg";
import BasketLink from "@/shared/basketLink";
import CompareLink from "@/shared/compareLink";
import FavoriteLink from "@/shared/favoriteLink";
import { ACTIONS } from "@/utils/constants";

interface IActions {
    onCloseMenu: () => void;
}

const Actions: FC<IActions> = ({ onCloseMenu }) => {
    const router = useRouter();
    const icons: {
        [type: string]: ReactNode;
    } = {
        fav: <FavoriteLink className={`stroke-white duration-[300ms]
            group-hover/fav:stroke-yellowWarm`}  />,
        compare: <CompareLink className={`fill-white transition ease-in-out 
            group-hover/compare:fill-yellowWarm duration-[300ms]`} />,
        cart: <BasketLink className={`fill-white duration-[300ms]
            group-hover/cart:fill-yellowWarm`} />,
        user: <User className={`fill-white duration-[300ms] 
            group-hover/user:fill-yellowWarm`} />
    };

    async function handleButton(link: string) {
        await router.push(link);
        onCloseMenu();
    }

    function renderActions() {
        return ACTIONS.map(action => {
            const { type, title, link } = action;

            return (
                <a key={type} className={"cursor-pointer"} onClick={() => handleButton(link)}>
                    <div className={`group/${type} w-max flex items-center gap-[10px]
                hover:text-yellowWarm text-sm text-white duration-[300ms]`}>
                        {icons[type]}
                        {title}
                    </div>
                </a>
            );
        });
    }

    return (
        <div className={"flex flex-wrap gap-[20px]"}>
            {renderActions()}
        </div>
    );
};

export default Actions;
