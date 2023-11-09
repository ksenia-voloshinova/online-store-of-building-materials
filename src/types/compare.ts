import { IProductCatalog } from "@/types/catalog";
import { ICharacteristic } from "@/types/productDetail";

export interface ICompareGroup {
    groupId: number;
    groupName: string;
    data: ICompareProduct[];
}

export interface ICompareProduct extends IProductCatalog {
    characteristics: ICharacteristic[];
}

export interface ICompareProductPost {
    elementId: number;
    productId: number;
}
