export type TAlertStatus = "success" | "error" | "info";

export interface IAlertState {
    status: TAlertStatus;
    message: string;
    isOpen: boolean;
}

export interface IAlert extends IAlertState {
    onClose: () => void;
}
