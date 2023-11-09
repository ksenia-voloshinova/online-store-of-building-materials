import { FC } from "react";
import { Controller } from "react-hook-form";

import DefaultTextarea from "@/shared/UI/textareas/defaultTextarea";
import { ITextAreaControlled } from "@/shared/UI/textareas/types";

const DefaultTextareaControlled: FC<ITextAreaControlled> = ({
    control,
    defaultValue,
    name,
    placeholder,
    errorMessage,
    style = "",
    onInput
}) => {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue ?? ""}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className={"w-full"}>
                    <DefaultTextarea
                        name={name}
                        placeholder={placeholder}
                        style={style}
                        value={value}
                        onChange={(value) => {
                            if (onInput) onInput(name, value);
                            onChange(value);
                        }}
                    />
                    <p className={"text-red text-xs lg:text-sm"}>{errorMessage}</p>
                </div>
            )}
        />
    );
};

export default DefaultTextareaControlled;
