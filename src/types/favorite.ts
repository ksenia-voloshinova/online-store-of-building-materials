import { IProductConverter } from "@/types/index";

export interface IFavorite {
    pageNumber: number;
    pageCount: number;
    productsCount: number;
    favorites: IFavoriteProduct[];
}

export interface IFavoriteProduct extends IProductConverter {
    weight: number;
    volume: number;
}

export interface IFavoriteFileLink {
    link: string;
}

export interface IFavoritesProductPost {
    id: number;
}

export interface IFavoritesSendEmail {
    email: string;
}
