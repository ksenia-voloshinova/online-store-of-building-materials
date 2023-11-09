import { IBreadcrumb, IConverter, ISeo } from "@/types/index";

export interface IProductDetail {
    id: number;
    elementId: number;
    slug: string;
    title: string;
    basePrice: number;
    salePrice: number;
    isSale: boolean;
    isSalable: boolean;
    rate: number;
    review: number;
    count: number;
    measureCode: string;
    measureName: string;
    converters: IConverter[];
    isFavorite: boolean;
    isComparable: boolean;
    photos: IProductPhoto[];
    sku: ISku[];
    info: ICharacteristic[];
    detailInfo: IDetailInfo;
}

export interface IProductDetailInfo {
    breadcrumbs: IBreadcrumb[];
    additionalInfo: IAdditionalInfo;
    seo: ISeo;
}

export interface IProductPhoto {
    id: number;
    image: string;
}

export interface ISku {
    id: number;
    slug: string;
    link: string;
    image: string;
    isChecked: boolean;
    isDisabled: boolean;
}

export interface IDetailInfo {
    description: string;
    characteristics: ICharacteristic[];
    documentation: IDocumentation[];
    reviews: IReview[];
}

export interface ICharacteristic {
    id: number;
    name: string;
    value: string;
}

export interface IDocumentation {
    id: number;
    file: string;
    name: string;
    format: string;
    size: string;
    icon: string;
}

export interface IReview {
    id: number;
    photo: string;
    name: string;
    date: string;
    rate: number;
    review: string;
    reply: string;
}

export interface IReviewGet {
    isLastPage: boolean;
    data: IReview[];
}

export interface IReviewPost {
    name: string;
    email: string;
    rate: number;
    review: string;
}

export interface IReviewResp {
    message: string;
    data: IReview;
}

export interface IAdditionalInfo {
    title: string;
    description: string;
    image: string;
}
