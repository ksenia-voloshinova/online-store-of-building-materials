import { FC } from "react";

import { MENU } from "@/utils/constants";

const Menu: FC = () => {
    function renderMenu() {
        return MENU.map(menu => {
            const { id, title, link } = menu;
            
            return (
                <li key={id}>
                    <a 
                        href={link ?? "#"}
                        className={"text-sm leading-[17px] tracking-[-0.02em] " +
                            "hover:text-yellowWarm duration-[400ms]"}
                    >
                        {title}
                    </a>
                </li>
            );
        });
    }
	
    return (
        <ul className={"flex gap-[25px]"}>
            {renderMenu()}
        </ul>
    );
};

export default Menu;