import React, { FC, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { IInput } from "@/shared/UI/inputs/types";

const SimpleInput: FC<IInput> = ({
    name,
    title= "",
    placeholder,
    value,
    onChange,
    styles,
    mask,
    isDisabled = false
}) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;

        setInputValue(value);
    }, [value]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;

        onChange(currentValue);
    }

    return (
        <label className={"flex flex-col text-xs text-blueMagenta"}>
            {title}
            {mask ? (
                <InputMask
                    autoComplete={"off"}
                    disabled={isDisabled}
                    mask={mask}
                    maskPlaceholder={placeholder}
                    value={inputValue}
                    className={`py-[10px] w-full text-blueMagentaDark text-xs border-b-2 border-white " +
                    "outline-none bg-[transparent] outline-none ${styles}`}
                    onChange={handleInput}
                />
            ) : (
                <input
                    autoComplete={"off"}
                    name={name}
                    placeholder={placeholder}
                    type="text"
                    value={inputValue}
                    className={`py-[10px] w-full text-blueMagentaDark text-xs border-b-2 border-white " +
                    "outline-none bg-[transparent] outline-none ${styles}`}
                    onChange={handleInput}
                />  
            )}
        </label>
    );
};

export default SimpleInput;