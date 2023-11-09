import { FC, useEffect, useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { Parallax } from "react-scroll-parallax";

import { IInfo } from "@/types/main";
import getArrayFromNumber from "@/utils/getArrayFromNumber";

interface IContent {
    data: IInfo[];
}

const Content: FC<IContent> = ({ data }) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [activeAdvantage, setActiveAdvantage] = useState<number>(1);
    const [progress, setProgress] = useState<number>(1);

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    function onScroll() {
        const items = listRef?.current?.querySelectorAll("li") ?? [];
        const height = progressRef?.current?.getBoundingClientRect().height ?? 300;

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < 500) {
                setProgress(-height * (+item.id - 1));
            }
        });
    }

    function onClickButton(id: number) {
        const height = progressRef?.current?.getBoundingClientRect().height ?? 300;

        setProgress(-height * (+id - 1));
        setActiveAdvantage(id);

        const item = document.getElementById(id.toString());
        const itemTop = item?.getBoundingClientRect().top ?? 0;
        const top = document.documentElement.scrollTop;

        window.scrollTo({
            top: top + itemTop - 400,
            behavior: "smooth"
        });
    }

    function renderNumbers() {
        return getArrayFromNumber(data.length).map((num) => {
            return <div key={num} ref={progressRef}>{num}</div>;
        });
    }

    function renderAdvantages() {
        return data.map((advantage, index) => {
            const { title, desc } = advantage;
            const key = index + 1;
            const isOpen = key === activeAdvantage;

            return (
                <li key={key} className={"border-b-1 border-white"} id={key.toString()}>
                    <button
                        className={`p-[25px] flex flex-col gap-[20px] min-h-[121px] 
                            md:min-h-[161px] ${isOpen ? "opacity-100" : "opacity-80 hover:bg-whiteWarm"} bg-white
                            w-full duration-[300ms]`}
                        onClick={() => onClickButton(key)}
                    >
                        <div className={"flex justify-between items-center gap-[15px] md:items-start w-full"}>
                            <p className={"md:text-[20px] text-left"}>{title}</p>
                            <div className={"flex gap-[40px]"}>
                                <div className={`${isOpen ? "hidden lg:block" : "hidden"} max-w-[300px] text-left`}>
                                    {desc}
                                </div>
                                <div className={`flex justify-center items-center min-w-[40px] 
                                        w-[40px] h-[40px] 
                                        ${isOpen 
                    ? "bg-white text-blueMagentaDark" 
                    : "bg-blueMagentaDark text-white"} 
                                        border-1 border-blueMagentaDark rounded-[50%]`}
                                >
                                    {isOpen ? "-" : "+"}
                                </div>
                            </div>
                        </div>
                        <div className={`${isOpen ? "block" : "hidden"} lg:hidden text-left`}>
                            {desc}
                        </div>
                    </button>
                </li>
            );
        });
    }

    return (
        <div className={"mdMax:pt-[20px] pt-[150px] relative z-[10]"}>
            <Fade bottom>
                <div
                    className={"container md:pl-[200px] text-[32px] md:text-[60px] lg:text-[93px] " +
                        "text-white font-500"}
                >
                    Преимущества
                </div>
            </Fade>
            <Parallax className={"mdMax:!relative mdMax:!transform-none"} speed={-5}>
                <div className={"md:pt-[20px] relative flex justify-end"}>
                    <div className={"p-[30px] sticky top-[300px] hidden md:block md:min-w-[250px] " +
                        "w-[250px] h-[250px] overflow-hidden " +
                        "lg:min-w-[367px] lg:h-[367px] text-[150px] lg:text-[200px] bg-yellowWarm"}
                    >
                        <div className={"duration-[500ms]"} style={{ transform: `translateY(${progress}px)` }}>
                            {renderNumbers()}
                        </div>
                    </div>
                    <ul ref={listRef} className={"pt-[20px] md:py-[60px] w-full lg:w-1/2"}>
                        {renderAdvantages()}
                    </ul>
                </div>
            </Parallax>
        </div>
    );
};

export default Content;
