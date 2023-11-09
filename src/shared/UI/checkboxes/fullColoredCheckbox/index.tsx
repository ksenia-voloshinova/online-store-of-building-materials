import { FC, ReactNode } from "react";

import Check from "@/assets/icons/check-white.svg";
import { ICheckbox } from "@/shared/UI/checkboxes/types";

interface IFullColoredCheckbox extends ICheckbox {
    children: ReactNode;
}

const DefaultCheckbox: FC<IFullColoredCheckbox> = ({
    children,
    isChecked,
    isDisabled = false,
    onChange
}) => {
    return (
        <label className={`relative flex items-center gap-[8px] cursor-pointer
        ${isDisabled && "opacity-40"}`}
        >
            <div 
                className={`relative min-w-[15px] min-h-[15px] border-1 rounded-[2px] 
                ${isChecked 
            ? "bg-yellowWarm border-yellowWarm" 
            : "bg-cyanBlueLight border-cyanBlueMiddle"} duration-[300ms]`}
            >
                {isChecked && <Check className={"absolute top-[-2px] left-[-1px]"} />}
            </div>
            <input
                checked={isChecked}
                className={"absolute w-[15px] h-[15px] opacity-0"}
                disabled={isDisabled}
                type="checkbox"
                onChange={onChange}
            />
            <div className={"text-sm text-black"}>
                {children}
            </div>
        </label>
    );
};

export default DefaultCheckbox;