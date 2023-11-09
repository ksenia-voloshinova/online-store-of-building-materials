import { FC, useEffect, useState } from "react";

import Title from "@/shared/UI/switcher/defaultOutsideSwitcher/Title";

interface IDefaultOutsideSwitcher {
    defaultValue: boolean;
    switchers: string[];
    onClick: (value: boolean) => void;
}

const DefaultOutsideSwitcher: FC<IDefaultOutsideSwitcher> = ({ defaultValue, switchers, onClick }) => {
    const [isActiveSwitch, setIsActiveSwitch] = useState<boolean>(false);

    useEffect(() => {
        setIsActiveSwitch(defaultValue);
    }, []);

    function handleSwitcher(value: boolean) {
        if (onClick) onClick(value);

        setIsActiveSwitch(value);
    }

    return (
        <div className={"flex gap-[16px]"}>
            {switchers[0] && (
                <Title
                    isActive={isActiveSwitch}
                    onClick={() => handleSwitcher(true)}
                >
                    {switchers[0]}
                </Title>
            )}
            <label className={"relative min-w-[60px] h-[30px] md:min-w-[70px] md:h-[35px] bg-cyanBlueLight " +
                "rounded-[4px] cursor-pointer"}
            >
                <input
                    className={"w-full h-full opacity-0 cursor-pointer"}
                    type="checkbox"
                    onChange={() => handleSwitcher(!isActiveSwitch)}
                />
                <div
                    className={`absolute top-[0px] ${isActiveSwitch ? "translate-x-[0]" : "translate-x-[100%]"} 
                    w-[30px] md:w-[35px] h-full bg-white rounded-[4px] 
                    shadow-[0px_-1px_2px_rgba(33,37,41,0.24),_0px_2px_4px_rgba(33,37,41,0.24)] duration-[200ms]`}
                />
            </label>
            {switchers[1] && (
                <Title
                    isActive={!isActiveSwitch}
                    onClick={() => handleSwitcher(false)}
                >
                    {switchers[1]}
                </Title>
            )}
        </div>
    );
};

export default DefaultOutsideSwitcher;
