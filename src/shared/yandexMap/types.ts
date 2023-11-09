import { ICoords } from "@/types/basket";

export type IYandexMap<T = IPlacemark> = {
    width?: string;
    height?: string;
    isDisabled?: boolean;
    value?: string;
    defaultPlaceMark?: boolean;
    placemarks?: T[];
    defaultCenter?: number[];
    renderPoint?: (item: T) => React.ReactElement
    center?: number[];
    grayMode?: boolean
    onChange?: (data: any) => void;
    containterClassNames?: string
}

export interface IPlacemark {
    coords: ICoords;
    isActive: boolean;
}
