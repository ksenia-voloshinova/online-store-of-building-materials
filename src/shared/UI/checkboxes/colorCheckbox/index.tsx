import { FC } from "react";

import { ICheckbox } from "@/shared/UI/checkboxes/types";

interface IColorCheckbox extends ICheckbox {
    color: string;
    title: string;
}

const ColorCheckbox: FC<IColorCheckbox> = ({
    title,
    color,
    isChecked,
    isDisabled = false,
    onChange
}) => {
    return (
        <label className={`relative flex items-center gap-[18px] ${isDisabled && "opacity-40"}`}>
            <div 
                className={`p-[2px] flex justify-center items-center w-[32px] h-[32px] 
                border-[1px] ${isChecked ? "border-cyanBlueDark" : "border-[transparent]"}`} 
            >
                <div className={"w-full h-full"} style={{ backgroundColor: color }}  />
            </div>
            <input
                checked={isChecked}
                className={"absolute w-[32px] h-[32px] opacity-0"}
                disabled={isDisabled}
                type="checkbox"
                onChange={onChange}
            />
            <div className={`text-cyanBlueCool ${isChecked && "font-bold"}`}>
                {title}
            </div>
        </label>
    );
};

export default ColorCheckbox;