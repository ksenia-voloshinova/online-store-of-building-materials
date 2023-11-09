import { FC } from "react";

import Dzen from "@/assets/icons/dzen.svg";
import Odnoklassniki from "@/assets/icons/odnoklassniki.svg";
import Rutube from "@/assets/icons/rutube.svg";
import Telegram from "@/assets/icons/telegram.svg";
import VK from "@/assets/icons/vk.svg";
import Yappy from "@/assets/icons/yappy.svg";
import YouTube from "@/assets/icons/youtube.svg";

const NETWORKS = [
    {
        id: "vk",
        link: "https://vk.com/dockeru",
        icon: <VK />,
    },
    {
        id: "odnoklassniki",
        link: "https://ok.ru/dockeru",
        icon: <Odnoklassniki />,
    },
    {
        id: "youtube",
        link: "https://www.youtube.com/c/DockeDom",
        icon: <YouTube />,
    },
    {
        id: "dzen",
        link: "https://zen.yandex.ru/docke",
        icon: <Dzen />,
    },
    {
        id: "telegram",
        link: "https://t.me/dockeofficial",
        icon: <Telegram />,
    },
    {
        id: "yappy",
        link: "https://yappy.media/profile/83b3df1237634f34b2875b3af6bee1c3",
        icon: <Yappy />,
    },
    {
        id: "rutube",
        link: "https://rutube.ru/channel/24621492/",
        icon: <Rutube />,
    },
];

const Networks: FC = () => {
    function renderNetworks() {
        return NETWORKS.map(network => {
            const { id, link, icon } = network;

            return (
                <li key={id} className={"w-max h-max"}>
                    <a href={link ?? "#"} rel="noreferrer" target={"_blank"} 
                        className={"p-[8px] flex justify-center items-center " +
                        "rounded-[50%] border-blueMagenta border-1 " +
                        "duration-[400ms] " +
                        "hover:bg-yellowWarm hover:border-yellowWarm"
                        }>
                        {icon}
                    </a>
                </li>
            ); 
        });    
    }
    
    return (
        <div className={"flex flex-col gap-[10px] w-1/2"}>
            <small className={"text-blueMagenta text-right"}>
                Docke <br/> в социальных сетях
            </small>
            <ul className={"flex justify-end flex-wrap gap-[20px] h-max"}>
                {renderNetworks()}
            </ul>
        </div>
    );
};

export default Networks;