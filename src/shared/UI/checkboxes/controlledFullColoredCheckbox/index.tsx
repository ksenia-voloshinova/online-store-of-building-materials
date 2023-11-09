import { FC } from "react";
import { Controller } from "react-hook-form";

import FullColoredCheckbox from "@/shared/UI/checkboxes/fullColoredCheckbox";
import { ICheckboxControlled } from "@/shared/UI/checkboxes/types";

const ControlledFullColoredCheckbox: FC<ICheckboxControlled> = ({
    control, 
    isDisabled= false,
    name,
    defaultValue,
    errorStyle,
    errorMessage,
    children
}) => {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue ?? false}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className={"w-full"}>
                    <FullColoredCheckbox
                        isChecked={value}
                        isDisabled={isDisabled}
                        onChange={onChange}
                    >
                        {children}
                    </FullColoredCheckbox>
                    <p className={`mt-[4px] text-red text-xs ${errorStyle}`}>
                        {errorMessage}
                    </p>
                </div>
            )}
        />
    );
};

export default ControlledFullColoredCheckbox;