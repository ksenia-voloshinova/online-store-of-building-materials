import React, { FC, useEffect, useState } from "react";

import { ITextArea } from "@/shared/UI/textareas/types";

const DefaultTextarea: FC<ITextArea> = ({
    name,
    title= "",
    placeholder,
    value,
    onChange,
    style = ""
}) => {
    const [textareaValue, setTextareaValue] = useState<string>("");

    useEffect(() => {
        if (typeof window === "undefined") return;

        setTextareaValue(value);
    }, [value]);

    function handleTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const currentValue = e.target.value;

        onChange(currentValue);
    }

    return (
        <label className={"w-full"}>{title}
            <textarea
                autoComplete={"off"}
                name={name}
                placeholder={placeholder}
                value={textareaValue}
                className={`px-[16px] py-[9px] w-full h-[160px] text-sm lg:text-[16px]
                border-1 border-cyanBlueMiddle rounded placeholder:text-cyanBlueMiddle 
                placeholder:text-sm placeholder:lg:text-[16px] outline-none resize-none ${style}`}
                onChange={handleTextarea}
            />
        </label>
    );
};

export default DefaultTextarea;
