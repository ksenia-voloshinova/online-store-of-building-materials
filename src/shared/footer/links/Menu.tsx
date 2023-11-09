import { FC } from "react";

import { FOOTER_MENU } from "@/utils/constants";

const Menu: FC = () => {
    function renderMenu() {
        return FOOTER_MENU.map(linkItem => {
            const { id, title, link, target } = linkItem;
            
            return (
                <li key={id}>
                    <a 
                        href={link ?? "#"}
                        rel="noreferrer"
                        target={target ? "_blank" : ""} 
                        className={"text-sm md:text-[20px] leading-[16px] " +
                        "tracking-[-0.02em] text-white " +
                        "duration-[400ms] hover:text-blueMagenta"}
                    >
                        {title}
                    </a>
                </li>
            );
        });
    }
    
    return (
        <nav>
            <ul className={"flex flex-col gap-[4px] md:gap-[10px]"}>{renderMenu()}</ul>
        </nav>
    );
};

export default Menu;