import React, { FC, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { IInput } from "@/shared/UI/inputs/types";

const DefaultInput: FC<IInput> = ({
    type,
    name,
    title= "",
    placeholder,
    value,
    mask,
    onChange,
    isDisabled = false,
    isError =  false,
    min,
    max
}) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (typeof window === "undefined") return;

        setInputValue(value);
    }, [value]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;

        onChange(currentValue);
    }

    return (
        <label>
            {title}
            {mask ? (
                <InputMask
                    alwaysShowMask={false}
                    autoComplete={"off"}
                    disabled={isDisabled}
                    mask={mask}
                    max={max}
                    min={min}
                    placeholder={placeholder}
                    value={inputValue}
                    className={`px-[16px] py-[9px] w-full text-sm lg:text-[16px] 
                    border-1 ${isError ? "border-red" : "border-cyanBlueMiddle"} rounded 
                    ${isDisabled ? "bg-desaturatedWhiteWarm" : "bg-white"}
                    placeholder:text-cyanBlueMiddle placeholder:text-sm 
                    placeholder:lg:text-[16px] outline-none`}
                    onChange={handleInput}
                />
            ) : (
                <input
                    autoComplete={"off"}
                    disabled={isDisabled}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={inputValue}
                    className={`px-[16px] py-[9px] w-full text-sm lg:text-[16px] 
                    border-1 ${isError ? "border-red" : "border-cyanBlueMiddle"} rounded 
                    ${isDisabled ? "bg-desaturatedWhiteWarm" : "bg-white"}
                    placeholder:text-cyanBlueMiddle placeholder:text-sm 
                    placeholder:lg:text-[16px] outline-none`}
                    onChange={handleInput}
                />
            )}
        </label>
    );
};

export default DefaultInput;
