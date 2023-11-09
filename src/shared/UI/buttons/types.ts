import { ReactNode } from "react";

export interface IButton {
    children?: ReactNode;
    isDisabled?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
    styles?: string;
    onClick?: () => void;
}