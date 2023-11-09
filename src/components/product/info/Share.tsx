import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { OKShareButton, TelegramShareButton, VKShareButton } from "react-share";

import CopiedIcon from "@/assets/icons/check-true.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import OdnoklassinikiIcon from "@/assets/icons/odnoklassniki-share.svg";
import ShareIcon from "@/assets/icons/share.svg";
import TelegramIcon from "@/assets/icons/telegram-share.svg";
import VkIcon from "@/assets/icons/vk-share.svg";

const Share: FC = () => {
    const [copied, setCopied] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        setUrl(window.location.href);
    }, []);
    
    async function copyCurrentUrl() {
        if (typeof window === "undefined") return;
        
        await navigator.clipboard.writeText(url);
        
        setCopied(true);
    }
    
    return (
        <Popover className="relative">
            <Popover.Button className={"group flex flex-nowrap items-center gap-[5px] cursor-pointer outline-none"}>
                <ShareIcon className={"stroke-cyanBlueGray group-hover:stroke-yellowWarm duration-[300ms]"} />
                <p className={"text-sm md:text-[16px] text-cyanBlueGray group-hover:text-yellowWarm duration-[300ms]"}>
                    Поделиться
                </p>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel
                    className="p-[20px] w-max top-[30px] sm:left-[-40%] absolute 
                        z-10 bg-white border-1 border-cyanBlueLight"
                >
                    <div className="group flex flex-col text-sm">
                        <button 
                            className={"flex items-center gap-[10px] w-max"} 
                            onClick={copyCurrentUrl}
                        >
                            {copied ? <CopiedIcon height={14} width={14} /> : <CopyIcon />}
                            <p>Скопировать ссылку</p>
                        </button>
                        <VKShareButton 
                            className={"flex items-center gap-[10px] w-max"} 
                            resetButtonStyle={false} url={url}
                        >
                            <VkIcon />
                            <p>Вконтакте</p>
                        </VKShareButton>
                        <TelegramShareButton 
                            className={"flex items-center gap-[10px] w-max"} 
                            resetButtonStyle={false} 
                            url={url}
                        >
                            <TelegramIcon />
                            <p>Телеграмм</p>
                        </TelegramShareButton>
                        <OKShareButton 
                            className={"flex items-center gap-[10px] w-max"} 
                            resetButtonStyle={false} 
                            url={url}
                        >
                            <OdnoklassinikiIcon height={16} width={16} />
                            <p>Одноклассники</p>
                        </OKShareButton>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default Share;