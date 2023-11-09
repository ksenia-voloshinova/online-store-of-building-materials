import { FC } from "react";
import { Controller } from "react-hook-form";

import SimpleInput from "@/shared/UI/inputs/simpleInput";
import { IInputControlled } from "@/shared/UI/inputs/types";

const SimpleInputControlled: FC<IInputControlled> = ({
    control,
    defaultValue,
    name,
    placeholder,
    errorMessage,
    errorStyle= "text-xs text-red",
    title = "",
    styles = "",
    mask = "",
}) => {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue ?? ""}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className={"w-full"}>
                    <SimpleInput
                        mask={mask}
                        name={name}
                        placeholder={placeholder}
                        styles={styles}
                        title={title}
                        value={value}
                        onChange={onChange}
                    />
                    <p className={errorStyle}>{errorMessage}</p>
                </div>
            )}
        />
    );
};

export default SimpleInputControlled;