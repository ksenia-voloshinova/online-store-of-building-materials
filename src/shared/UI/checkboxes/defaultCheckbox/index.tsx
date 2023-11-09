import { FC, ReactNode } from "react";

import Check from "@/assets/icons/check.svg";
import { ICheckbox } from "@/shared/UI/checkboxes/types";

interface IDefaultCheckbox extends ICheckbox {
    children: ReactNode;
}

const DefaultCheckbox: FC<IDefaultCheckbox> = ({ 
    children, 
    isChecked, 
    isDisabled = false, 
    onChange 
}) => {
    return (
        <label className={`relative flex items-center gap-[18px] cursor-pointer
        ${isDisabled && "opacity-40"}`}
        >
            <div className={"relative min-w-[15px] min-h-[15px] border-2 border-cyanBlueCool"}>
                {isChecked && <Check className={"absolute top-[0px] left-[1px]"} />}
            </div>
            <input 
                checked={isChecked}
                className={"absolute w-[15px] h-[15px] opacity-0"} 
                disabled={isDisabled}
                type="checkbox"
                onChange={onChange}
            />
            <div className={`text-cyanBlueCool ${isChecked && "font-bold"}`}>
                {children}
            </div>
        </label>
    );
};

export default DefaultCheckbox;