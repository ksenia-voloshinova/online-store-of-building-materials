import { useEffect, useState } from "react";

import CloseMenu from "@/assets/icons/close.svg";
import Menu from "@/assets/icons/menu.svg";
import useWindowSize from "@/hooks/useWindowSize";
import MenuPopup from "@/shared/UI/popups/menuPopup";

const MenuMobile = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const { width } = useWindowSize();
    const iconStyle = "stroke-black group-hover:stroke-yellowWarm duration-[300ms]";
    
    useEffect(() => {
        if (!width) return;
        
        if (width >= 1200) {
            setIsOpenMenu(false);
        }
    }, [width]);

    function toggleMenu() {
        setIsOpenMenu(!isOpenMenu);
    }
    
    return (
        <>
            <button
                className={"group flex flex-col items-center"}
                type={"button"}
                onClick={toggleMenu}
            >
                {isOpenMenu ? (
                    <CloseMenu className={iconStyle} />
                ) : (
                    <Menu className={iconStyle} />
                )}
                <p 
                    className={"text-sm text-cyanBlueDark group-hover:text-yellowWarm " +
                        "duration-[300ms]"}
                >
                    Меню
                </p>
            </button>
            <MenuPopup isOpen={isOpenMenu} onClose={toggleMenu} />
        </>
    );
};

export default MenuMobile;