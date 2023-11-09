import { RadioGroup } from "@headlessui/react";
import { FC, ReactNode, useEffect, useState } from "react";

export interface ISwitch {
    code: string;
    name: ReactNode | string;}

interface IDefaultSwitcher {
    switchers: ISwitch[];
    defaultValue: string;
    onClick?: (switcherId: string) => void;
}

const DefaultSwitcher: FC<IDefaultSwitcher> = ({
    switchers,
    defaultValue,
    onClick,
}) => {
    const [activeSwitch, setActiveSwitch] = useState<string>("");

    useEffect(() => {
        setActiveSwitch(defaultValue);
    }, []);

    function handleSwitcher(id: string) {
        if (onClick) onClick(id);

        setActiveSwitch(id);
    }

    function renderSwitches() {
        return switchers.map(switcher => {
            const { code, name } = switcher;

            return (
                <RadioGroup.Option key={code} value={code}>
                    {({ checked }) => (
                        <div className={`px-[12px] py-[4px] rounded-[4px] 
                        cursor-pointer duration-[200ms] min-h-[30px] min-w-[35px]
                        ${checked
                            ? "bg-white " +
                            "shadow-[0px_-1px_2px_rgba(33,37,41,0.24),_0px_2px_4px_rgba(33,37,41,0.24)]"
                            : "bg-[transparent]"
                        }`}
                        >
                            {name}
                        </div>
                    )}
                </RadioGroup.Option>
            );
        });
    }

    return (
        <RadioGroup value={activeSwitch} onChange={handleSwitcher}>
            <div className={"flex bg-cyanBlueLight rounded-[4px]"}>
                {renderSwitches()}
            </div>
        </RadioGroup>
    );
};

export default DefaultSwitcher;
