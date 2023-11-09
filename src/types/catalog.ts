import { IBreadcrumb, ISeo } from "@/types/index";

export enum FilterTypes {
    slider = "slider",
    checkboxText = "checkboxText",
    checkboxImage = "checkboxImage",
    checkboxColor = "checkboxColor",
}

export enum RangeValue {
    min = "min",
    max = "max",
}

export type TCheckboxFilter = ICheckboxTextFilter | ICheckboxImageFilter | ICheckboxColorFilter;

export type TCheckboxFilterValue = ICheckboxTextValue | ICheckboxImageValue | ICheckboxColorValue;

export type TFilter = Array<TCheckboxFilter | ISliderFilter>;

export interface ICheckedParams {
    [name: string]: string | string[] | number;
}

export interface IVerifiedFilters {
    [key: string]: string | string[] | number | object;
}

export interface ICatalog {
    page: number;
    limit: number;
    productsCount: number;
    products: IProductCatalog[];
}

export interface IVariateCatalog {
    id: number;
    slug: string;
    title: string;
    link: string;
    isChecked: boolean;
}

export interface ICatalogInfo {
    breadcrumbs: IBreadcrumb[];
    seo: ISeo;
}

export interface IProductCatalog {
    id: number;
    elementId: number;
    link: string;
    image: string;
    name: string;
    basePrice: number;
    salePrice: number;
    isSale: boolean;
    rate: number;
    isSalable: boolean;
}

export interface IFilter {
    id: number;
    slug: string;
    title: string;
    isOpened: boolean;
}

export interface IRefetchedFilter {
    data: TFilter;
    params: IVerifiedFilters;
}

export interface ISliderFilter extends IFilter {
    type: FilterTypes.slider;
    range: IRange;
    affordableRange: IRange;
}

export interface ICheckboxTextFilter extends IFilter {
    type: FilterTypes.checkboxText;
    values: ICheckboxTextValue[];
}

export interface ICheckboxImageFilter extends IFilter {
    type: FilterTypes.checkboxImage;
    values: ICheckboxImageValue[];
}

export interface ICheckboxColorFilter extends IFilter {
    type: FilterTypes.checkboxColor;
    values: ICheckboxColorValue[];
}

export interface ICheckboxValue {
    id: number;
    slug: string;
    isDisabled: boolean;
}

export interface ICheckboxTextValue extends ICheckboxValue {
    title: string;
}

export interface ICheckboxImageValue extends ICheckboxValue {
    image: string;
    name: string;
}

export interface ICheckboxColorValue extends ICheckboxValue {
    color: string;
    title: string;
}

export interface IRange {
    [RangeValue.min]: number;
    [RangeValue.max]: number;
}

export interface ISort {
    id: number;
    slug: string;
    title: string;
}

export interface IPagination {
    page: number;
    pageCount: number;
    productsCount: number;
    limit: number;
}

