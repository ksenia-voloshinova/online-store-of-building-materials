import { IBannerImage, IBreadcrumb, ISeo, IStatistic } from "@/types/index";

export interface IProduct {
    id: number;
    link: string;
    value: string;
}

export interface IProductionCatalog {
    id: number;
    link: string;
    type: string;
    icon: string;
    varieties: IVariate[];
}

export interface IVariate {
    id: number;
    link: string;
    name: string;
}

export interface IProductionInfo {
    banner: IBanner;
    breadcrumbs: IBreadcrumb[];
    statistics: IStatistic[];
    info: {
        large: IInfo;
        small: IInfo;
    },
    seo: ISeo;
}

export interface IBanner {
    id: number;
    image: IBannerImage;
    title: string;
    subtitle: string;
}

export interface IInfo {
    id: number;
    title: string;
}
