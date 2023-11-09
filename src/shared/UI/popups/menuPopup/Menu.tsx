import { FC } from "react";

import { MENU } from "@/utils/constants";

const Menu: FC = () => {
    function renderMenu() {
        return MENU.map((menu, index) => {
            const { id, title, link } = menu;

            return (
                <li key={id}>
                    <a
                        href={link ?? "#"}
                        className={`block py-[9px] text-[20px] lg:text-[24px] 
                        text-white leading-[17px] tracking-[-0.02em] duration-[300ms] 
                        hover:text-blueMagenta " +
                            ${index !== MENU.length - 1 && "border-b-1 border-b-blueMagenta"}`}
                    >
                        {title}
                    </a>
                </li>
            );
        });
    }
    
    return (
        <ul>{renderMenu()}</ul>
    );
};

export default Menu;