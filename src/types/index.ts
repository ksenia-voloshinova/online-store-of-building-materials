import { Redirect } from "next";
import { DehydratedState } from "react-query";

import { IUserPersonalInfo } from "@/types/profile";

import { IGlobalInfoData } from "./info";

export interface IPageProps {
    seo?: ISeo | object | undefined;
    auth?: IAuth | object;
    dehydratedState?: DehydratedState;
    global?: IGlobalInfoData;
}

export interface IAuth {
    status: number;
    isPrivate: boolean;
    isPublic: boolean;
    user: IUserPersonalInfo;
}

export interface IPageRedirect {
    redirect: Redirect;
}

export interface ISeo {
    title: string;
    meta: IMeta;
}

export interface IMeta {
    title: string;
    description: string;
    keywords: string;
}

export interface IResp {
    data: object;
    message: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IDomain {
    slug: string;
    domain: string;
}

export interface IRegions {
    currentRegion: string;
    data: IRegion[];
}

export interface IRegion {
    id: string;
    slug: string;
    name: string;
}

export interface IPartner {
    id: number;
    name: string;
    image: string;
    link: string;
}

export interface IPromotion {
    id: number;
    link: string;
    image: string;
    title: string;
    description: string;
    color: string;
}

export interface IProduct {
    id: number;
    name: string;
    image: string;
    link: string;
    article: string;
    basePrice: number;
    fullPrice: number;
    count: number;
    measureCode: string;
    measureName: string;
    rate: number;
    isSalable: boolean;
}

export interface IProductConverter extends IProduct {
    converters: IConverter[];
}

export interface IConverter {
    name: string;
    code: string;
    codeOKEI: number;
    multiplier: number;
}

export interface ISubscriptionInfo {
    isSubscribed: boolean;
    message: string;
}

export interface IBreadcrumb {
    id: number;
    title: string;
    link: string;
}

export interface IStatistic {
    id: number;
    title: string;
    value: string;
}

export interface IBannerImage {
    desktop: string;
    table: string;
    mobile: string;
}

export interface ISupplier {
    name: string;
    position: string;
    company: string;
    phone: string;
    message: string;
    file: null | File;
}

export interface IDealer {
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
    message: string;
}
