import { FC } from "react";

import { IRadioButton } from "@/shared/UI/switcher/types";

const CircleSwitcher: FC<IRadioButton> = ({
    id,
    title,
    children,
    name,
    onChange,
    isChecked,
    isDisabled = false
}) => {
    function onChangeRadio(e: any) {
        onChange(e.target.id);
    }

    return (
        <label className={"relative flex items-center gap-[10px]"}>
            <div className={`p-[1px] min-w-[13px] max-w-[13px] w-full h-[13px] 
            flex items-center justify-center border-1 rounded-[50%]
            ${isChecked ? "border-yellowWarm" : "border-cyanBlueLight"} bg-white`}
            >
                <div className={`w-full h-full bg-yellowWarm rounded-[50%] ${isChecked ? "block" : "hidden"}`} />
            </div>
            <input
                checked={isChecked}
                className={"absolute opacity-0"}
                disabled={isDisabled}
                id={id}
                name={name}
                type="radio"
                onChange={onChangeRadio}
            />
            {title ?? children ?? ""}
        </label>
    );
};

export default CircleSwitcher;
