import { FC, useState } from "react";
import { Controller } from "react-hook-form";

import HiddenIcon from "@/assets/icons/hidden.svg";
import ShowIcon from "@/assets/icons/shown.svg";
import DefaultInput from "@/shared/UI/inputs/defaultInput";
import { IInputControlled } from "@/shared/UI/inputs/types";

const DefaultInputControlled: FC<IInputControlled> = ({
    type = "text",
    control,
    defaultValue,
    name,
    placeholder,
    errorMessage,
    mask,
    isDisabled = false,
    isError = false,
    onInput,
    min,
    max
}) => {
    const [isPassword, setIsPassword] = useState(type === "password");

    return (
        <Controller
            control={control}
            defaultValue={defaultValue ?? ""}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className={"w-full"}>
                    <div className={"relative"}>
                        <DefaultInput
                            isDisabled={isDisabled}
                            isError={isError}
                            mask={mask}
                            max={max}
                            min={min}
                            name={name}
                            placeholder={placeholder}
                            type={isPassword ? "password" : "text"}
                            value={value}
                            onChange={(value) => {
                                if (onInput) onInput(name, value);
                                onChange(value);
                            }}
                        />
                        {type === "password" && (
                            <button
                                className={"absolute top-[25%] right-[16px]"}
                                tabIndex={-1}
                                type={"button"}
                                onClick={() => setIsPassword(!isPassword)}
                            >
                                {isPassword
                                    ? <HiddenIcon height={24} width={24} />
                                    : <ShowIcon height={24} width={24} />}
                            </button>
                        )}
                    </div>
                    <p className={"text-red text-xs"}>{errorMessage}</p>
                </div>
            )}
        />
    );
};

export default DefaultInputControlled;
