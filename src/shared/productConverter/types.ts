import { IProduct, IProductConverter } from "@/types";

export interface IConverterProduct {
    product: IProductConverter | IProduct;
    isDisabled?: boolean;
    deleteOnZero: boolean;
}
