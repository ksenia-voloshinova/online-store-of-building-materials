import { Control } from "react-hook-form";

export type TInput = "text" | "password";

export interface IInput {
    type?: TInput;
    mask?: string;
    min?: number;
    max?: number;
    value: string;
    title?: string;
    styles?: string;
    name: string;
    placeholder?: string;
    isDisabled?: boolean;
    isError?: boolean;
    onChange: (value: string) => void;
}

export interface IInputControlled {
    onInput?: (name: string, value: string) => void;
    type?: TInput;
    mask?: string;
    min?: number;
    max?: number;
    title?: string;
    control: Control<any>;
    defaultValue?: string;
    name: string;
    placeholder?: string;
    styles?: string;
    isDisabled?: boolean;
    isError?: boolean;
    errorMessage: string;
    errorStyle?: string;
}
