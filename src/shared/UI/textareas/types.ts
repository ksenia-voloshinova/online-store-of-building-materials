import { Control } from "react-hook-form";

export interface ITextArea {
    style?: string;
    value: string;
    title?: string;
    name: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export interface ITextAreaControlled {
    onInput?: (name: string, value: string) => void;
    control: Control<any>;
    defaultValue?: string;
    name: string;
    placeholder?: string;
    errorMessage: string;
    errorStyle?: string;
    style?: string;
}
