import { IBannerImage, ISeo, IStatistic } from "@/types/index";

export interface IMainInfo {
    banner: IBanner;
    info: IInfo[];
    advantages: IAdvantages;
    employees: IEmployees;
    seo: ISeo;
}

export interface ILink {
    title: string;
    href: string;
}

export interface IBanner {
    image: IBannerImage;
    title: string;
    subtitle: string;
    link: ILink;
}

export interface IInfo {
    id: number;
    title: string;
    desc: string;
}

export interface IAdvantages {
    image: IBannerImage;
    data: IInfo[];
}

export interface IEmployees {
    image: string;
    link: ILink;
    title: string;
    data: IStatistic[];
}
