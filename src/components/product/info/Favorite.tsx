import { FC } from "react";

import Fav from "@/assets/icons/fav-sm.svg";
import useFavorites from "@/hooks/useFavorites";

interface IFavorite {
    id: number;
}

const Favorite: FC<IFavorite> = ({ id }) => {
    const { currentProduct, toggleProductFavorites } = useFavorites(id);

    return (
        <button
            className={"group flex flex-nowrap items-center gap-[5px] cursor-pointer"}
            onClick={toggleProductFavorites}
        >
            <Fav className={`${currentProduct ? "stroke-yellowWarm" : "stroke-cyanBlueGray"}
                group-hover:stroke-yellowWarm duration-[300ms]`}
            />
            <p className={`text-sm md:text-[16px] ${currentProduct ? "text-yellowWarm" : "text-cyanBlueGray"} 
            group-hover:text-yellowWarm duration-[300ms]`}
            >
                {currentProduct ? "В избранном" : "В избранное"}
            </p>
        </button>
    );
};

export default Favorite;
