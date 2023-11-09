import { FC } from "react";

import Regions from "@/shared/regions";
import Actions from "@/shared/UI/popups/menuPopup/Actions";
import Links from "@/shared/UI/popups/menuPopup/Links";
import Menu from "@/shared/UI/popups/menuPopup/Menu";
import SearchProducts from "@/shared/UI/popups/menuPopup/SearchProducts";

interface IContent {
    onCloseMenu: () => void;
    openSearchPopup: () => void;
}

const Content: FC<IContent> = ({ onCloseMenu, openSearchPopup }) => {
    return (
        <div className={"sm:p-[40px] md:p-[80px] pb-[80px] " +
            "sm:pb-[145px] md:pb-[218px] " +
            "fixed flex justify-center w-full sm:w-[70%] lg:w-4/6 h-full"}
        >
            <div className="flex flex-col justify-between w-full">
                <div className={"p-containerSm sm:p-0 h-full " +
                    "bg-blueMagentaDark sm:bg-[transparent]"}
                >
                    <div
                        className={"pb-[20px] sm:pb-0 lg:hidden " +
                            "flex flex-col gap-[20px]"}
                    >
                        <div className={"md:hidden flex items-center justify-between"}>
                            <Regions style={"text-white text-left text-right " +
                                "duration-[300ms] hover:text-yellowWarm"}
                            />
                            <SearchProducts onOpen={openSearchPopup} />
                        </div>
                        <Actions onCloseMenu={onCloseMenu} />
                    </div>
                    <Menu />
                </div>
                <Links />
            </div>
        </div>
    );
};

export default Content;
