import { ReactNode } from "react";

export interface IRadioButton {
    id: string;
    name: string;
    title?: string;
    children?: ReactNode;
    onChange: (name: string) => void;
    isChecked: boolean;
    isDisabled?: boolean;
}
