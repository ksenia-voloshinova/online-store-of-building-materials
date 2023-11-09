import { FC, useEffect, useState } from "react";

import ArrowIcon from "@/assets/icons/arrow-light.svg";

const ScrollButton: FC = () => {
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        document.addEventListener("scroll", watchOnScroll);

        return () => {
            document.removeEventListener("scroll", watchOnScroll);
        };
    }, []);

    function watchOnScroll() {
        const top = document.documentElement.scrollTop;

        if (top > 500) {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }
    }

    function scrollToTop() {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }

    return (
        <button
            type={"button"}
            className={`${isHidden ? "hidden" : "fixed"} bottom-[10px] right-[10px] z-[1000] flex justify-center 
            items-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] bg-blueMagentaDark border-1 border-whiteWarm`}
            onClick={scrollToTop}
        >
            <ArrowIcon className={"rotate-180"} />
        </button>
    );
};

export default ScrollButton;
