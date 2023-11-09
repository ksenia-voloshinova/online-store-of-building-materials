import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface ICheckbox {
    isChecked: boolean;
    isDisabled?: boolean;
    onChange: () => void;
}

export interface ICheckboxControlled {
    isDisabled?: boolean;
    children?: ReactNode;
    control: Control<any>;
    defaultValue?: boolean;
    name: string;
    errorMessage: string;
    errorStyle?: string;
}
