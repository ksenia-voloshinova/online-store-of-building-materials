import axios, { AxiosRequestConfig } from "axios";

import { instance, serverInstance } from "@/api/instance";
import {
    IDealer,
    IDomain,
    IPartner,
    IProductConverter,
    IPromotion,
    IRegions, IResp,
    ISubscriptionInfo,
} from "@/types";
import {
    IConfirmChangePasswordReq, IConfirmRegistrationReq, ILoginResp,
    TChangePassword,
    TLogin, TRegistration,
} from "@/types/auth";
import {
    IBasketInfo,
    IBasketPayment,
    IBasketStatistics,
    INewBasketProduct, INewOrderInfo,
    IPaymentType,
    IPickupAddress,
    IShippingType
} from "@/types/basket";
import {
    ICatalog,
    ICatalogInfo,
    IProductCatalog,
    ISort,
    IVariateCatalog,
    TFilter
} from "@/types/catalog";
import { ICompareGroup, ICompareProductPost } from "@/types/compare";
import { IContactsInfo, IContactsInfoItem } from "@/types/contacts";
import { IFavorite, IFavoriteFileLink, IFavoritesProductPost, IFavoritesSendEmail } from "@/types/favorite";
import { IGlobalInfoData } from "@/types/info";
import { IMainInfo } from "@/types/main";
import { IProductDetail, IProductDetailInfo, IReviewGet, IReviewPost, IReviewResp } from "@/types/productDetail";
import { IProduct, IProductionCatalog, IProductionInfo } from "@/types/production";
import {
    IAddress,
    IAddressReq,
    IChangeEmailConfirmReq,
    IOrderData,
    IUserPersonalInfo,
    TAuthChangePassword,
} from "@/types/profile";
import { BASE_DOMAIN } from "@/utils/constants";

// json-server из коробки поддерживает поиск, но с зарезервированным ключом "q"
// на проде поиск будет по ключу "value"
const SEARCH_KEY = process.env.NODE_ENV === "production" ? "value" : "q";
const baseURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_API_URL  : BASE_DOMAIN;

function getInstance() {
    return typeof window === "undefined" ? serverInstance : instance;
}

export async function fetchRefresh(refreshToken: string): Promise<ILoginResp> {
    const { data } = await axios.post(`${baseURL}/api/v1/auth/refresh`,
        {
            refreshToken
        }, {
            withCredentials: true,
        }
    );

    return data;
}

export async function fetchLogin(userData: TLogin): Promise<ILoginResp> {
    const { data } = await getInstance().post("/auth/login/", userData);

    return data;
}

export async function fetchLogout(): Promise<IResp> {
    const { data } = await getInstance().post("/auth/logout/", {});

    return data;
}

export async function fetchRegistration(userData: TRegistration): Promise<IResp> {
    const { data } = await getInstance().post("/auth/registration/", userData);

    return data;
}

export async function fetchConfirmRegistration(
    userData: IConfirmRegistrationReq
): Promise<IResp> {
    const { data } = await getInstance().post("/auth/registration/confirm/", userData);

    return data;
}

export async function fetchChangePassword(email: TChangePassword): Promise<IResp> {
    const { data } = await getInstance().post("/auth/changePassword/", email);

    return data;
}

export async function fetchConfirmChangePassword(
    userData: IConfirmChangePasswordReq
): Promise<IResp> {
    const { data } = await getInstance().post("/auth/changePassword/confirm/", userData);

    return data;
}

export async function fetchAuthChangePassword(
    userData: TAuthChangePassword
): Promise<IResp> {
    const { data } = await getInstance().post("/profile/changePassword/", userData);

    return data;
}

export async function fetchConfirmChangeEmail(
    userData: IChangeEmailConfirmReq
): Promise<IResp> {
    const { data } = await getInstance().post("/profile/changeEmail/confirm/", userData);

    return data;
}
export async function fetchGlobalInfo(config = {}): Promise<IGlobalInfoData> {
    const { data } = await getInstance().get("/info/", config);

    return data;
}

export async function fetchSubdomain(config: AxiosRequestConfig): Promise<IDomain> {
    const { data } = await getInstance().get("/domain/", config);

    return data;
}

export async function fetchChangeRegion(slug: string): Promise<IDomain> {
    const { data } = await getInstance().post("/domain/", { slug });

    return data;
}

export async function fetchRegions(): Promise<IRegions> {
    const { data } = await getInstance().get("/regions/");

    return data;
}

export async function fetchPageType(slugs: string[], config = {}): Promise<string> {
    const { data } = await getInstance().get(`/catalog/pageType/${slugs.join("/")}/`, config);

    return data.type;
}

export async function fetchProducts(value: string): Promise<IProduct[]> {
    const { data } = await getInstance().get("/products/", {
        params: { [SEARCH_KEY]: value }
    });

    return data;
}

export async function fetchPromotionsMain(config = {}): Promise<IPromotion[]> {
    const { data } = await getInstance().get("/promotions/", config);

    return data;
}

export async function fetchMainInfo(config = {}): Promise<IMainInfo> {
    const { data } = await getInstance().get("/sections/info/", config);

    return data;
}

export async function fetchPromotionsCatalog(
    path = "",
    config = {},
): Promise<IPromotion[]> {
    const { data } = await getInstance().get(`/promotions/catalog/${path}/`, config);

    return data;
}

export async function fetchSubscription(email: string): Promise<ISubscriptionInfo> {
    const { data } = await getInstance().post("/subscription/", { email });

    return data;
}

export async function fetchSupplierFeedback(supplier: FormData): Promise<IResp> {
    const { data } = await getInstance().post("/feedback/supplier/", supplier);

    return data;
}

export async function fetchDealerFeedback(dealer: IDealer): Promise<IResp> {
    const { data } = await getInstance().post("/feedback/dealer/", dealer);

    return data;
}

export async function fetchProduction(config: {}): Promise<IProductionCatalog[]> {
    const { data } = await getInstance().get("/productionCatalog/", config);

    return data;
}

export async function fetchViewedProducts(config = {}): Promise<IProductCatalog[]> {
    const { data } = await getInstance().get("/viewed/", config);

    return data;
}

export async function fetchRecommendationProducts(
    path: string,
    config = {}
): Promise<IProductCatalog[]> {
    const { data } = await getInstance().get(`/recommendation/catalog/${path}/`, config);

    return data;
}

export async function fetchCrossSaleProducts(
    path: string,
    config = {}
): Promise<IProductCatalog[]> {
    const { data } = await getInstance().get(`/crossSale/catalog/${path}/`, config);

    return data;
}

export async function fetchCatalogSectionsInfo(config: {}): Promise<IProductionInfo> {
    const { data } = await getInstance().get("/catalog/sections/info/", config);

    return data;
}

export async function fetchCatalog(
    path: string,
    config = {}
): Promise<ICatalog> {
    const { data } = await getInstance().get(`/catalog/section/${path}/`, config);

    return data;
}

export async function fetchCatalogInfo(path: string, config = {}): Promise<ICatalogInfo> {
    const { data } = await getInstance().get(`/catalog/section/info/${path}/`, config);

    return data;
}

export async function fetchCatalogVarieties(path: string, config = {}): Promise<IVariateCatalog[]> {
    const { data } = await getInstance().get(`/catalog/section/varieties/${path}/`, config);

    return data;
}

export async function fetchCatalogFilters(
    path: string,
    config = {}
): Promise<TFilter> {
    const { data } = await getInstance().get(`/catalog/section/filters/${path}/`, config);

    return data;
}

export async function fetchCatalogSorts(path: string, config = {}): Promise<ISort[]> {
    const { data } = await getInstance().get(`/catalog/section/sort/${path}/`, config);

    return data;
}

export async function fetchProductDetail(path: string, config = {}): Promise<IProductDetail> {
    const { data } = await getInstance().get(`/catalog/detail/${path}/`, config);

    return data;
}

export async function fetchProductDetailInfo(
    path: string,
    config = {}
): Promise<IProductDetailInfo> {
    const { data } = await getInstance().get(`/catalog/detail/info/${path}/`, config);

    return data;
}

export async function fetchReviews(uuid: string | number, page: number): Promise<IReviewGet> {
    const { data } = await getInstance().get(`/reviews/catalog/${uuid}/`, {
        params: {
            page,
        }
    });

    return data;
}

export async function fetchReview(uuid: number, reviewData: IReviewPost): Promise<IReviewResp> {
    const { data } = await getInstance().post(`/reviews/catalog/${uuid}/`, reviewData);

    return data;
}


export async function fetchUserPersonalInfo(config = {}): Promise<IUserPersonalInfo> {
    const { data } = await getInstance().get("/profile/personalInfo/", config);

    return data;
}

export async function fetchUserPersonalInfoUpdate(userData: IUserPersonalInfo): Promise<IUserPersonalInfo> {
    const { data } = await getInstance().post("/profile/personalInfo/", userData);

    return data;
}

export async function fetchGetAddresses(config = {}): Promise<IAddress[]> {
    const { data } = await getInstance().get("/profile/addresses/", config);

    return data;
}

export async function fetchGetAddress(id: number): Promise<IAddress> {
    const { data } = await getInstance().get(`/profile/addresses/${id}/`);

    return data;
}

export async function fetchPostAddresses(address: IAddressReq): Promise<IResp> {
    const { data } = await getInstance().post("/profile/addresses/", address);

    return data;
}

export async function fetchDeleteAddress(id: string): Promise<IResp> {
    const { data } = await getInstance().delete(`/profile/addresses/${id}/`);

    return data;
}

export async function fetchUpdateAddress(id: string, address: IAddressReq): Promise<IResp> {
    const { data } = await getInstance().put(`/profile/addresses/${id}/`, address);

    return data;
}

export async function fetchDefaultAddress(config = {}): Promise<IAddress> {
    const { data } = await getInstance().get("/profile/addresses/default/", config);

    return data;
}

export async function fetchOrders(config = {}): Promise<IOrderData> {
    const { data } = await getInstance().get("/profile/orders/", config);

    return data;
}

export async function fetchOrderRepeat(id: string): Promise<IProductConverter[]> {
    const { data } = await getInstance().post("/profile/orders/repeat/", { id });

    return data;
}

export async function fetchOrderCancel(id: string): Promise<IResp> {
    const { data } = await getInstance().post("/profile/orders/cancel/", { id });

    return data;
}

export async function fetchPartners(): Promise<IPartner[]> {
    const { data } = await getInstance().get("/partners/");

    return data;
}

export async function fetchBasket(config = {}): Promise<IBasketInfo> {
    const { data } = await getInstance().get("/basket/", config);

    return data;
}

export async function fetchAddProductBasket(product: INewBasketProduct, config = {}): Promise<IBasketInfo> {
    const { data } = await getInstance().post("/basket/", product, config);

    return data;
}

export async function fetchDeleteProductBasket(productId: number, config = {}): Promise<IBasketInfo> {
    const { data } = await getInstance().delete(`/basket/${productId}/`, config);

    return data;
}

export async function fetchUpdateProductBasket(
    productId: number, count: number, config = {}
): Promise<IBasketInfo> {
    const { data } = await getInstance().put(`/basket/${productId}/`, { count }, config);

    return data;
}

export async function fetchBasketInfo(config = {}): Promise<IBasketStatistics> {
    const { data } = await getInstance().get("/basket/statistics/", config);

    return data;
}

export async function fetchBasketReset(config = {}): Promise<IBasketInfo> {
    const { data } = await getInstance().post("/basket/reset/", {}, config);

    return data;
}

export async function fetchPaymentTypes(config = {}): Promise<IPaymentType[]> {
    const { data } = await getInstance().get("/paymentTypes", config);

    return data;
}

export async function fetchShippingTypes(config = {}): Promise<IShippingType[]> {
    const { data } = await getInstance().get("/shippings", config);

    return data;
}

export async function fetchShippingPickup(config = {}): Promise<IPickupAddress[]> {
    const { data } = await getInstance().get("/shipping/pickupAddresses", config);

    return data;
}

export async function fetchBasketPayment(basketData: IBasketPayment): Promise<INewOrderInfo> {
    const { data } = await getInstance().post("/basket/payment/", basketData);

    return data;
}

export async function fetchGetCompare(config = {}): Promise<ICompareGroup[]> {
    const { data } = await getInstance().get("/compare/", config);

    return data;
}

export async function fetchAddToCompare(product: ICompareProductPost): Promise<ICompareGroup[]> {
    const { data } = await getInstance().post("/compare/", product);

    return data;
}

export async function fetchDeleteFromCompare(elementId: number, id: number): Promise<ICompareGroup[]> {
    const { data } = await getInstance().delete(`/compare/${elementId}/${id}/`);

    return data;
}

export async function fetchGetFavorites(config = {}): Promise<IFavorite> {
    const { data } = await getInstance().get("/favorites/", config);

    return data;
}

export async function fetchAddToFavorites(product: IFavoritesProductPost): Promise<IFavorite> {
    const { data } = await getInstance().post("/favorites/", product);

    return data;
}

export async function fetchDeleteFromFavorites(id: number): Promise<IFavorite> {
    const { data } = await getInstance().delete(`/favorites/${id}/`);

    return data;
}

export async function fetchFavoritesSendEmail(email: IFavoritesSendEmail): Promise<IResp> {
    const { data } = await getInstance().post("/favorites/sendEmail/", email);

    return data;
}

export async function fetchGetFavoritesLink(config = {}): Promise<IFavoriteFileLink> {
    const { data } = await getInstance().get("/favorites/pdfLink/", config);

    return data;
}
export async function fetchContacts(config = {}): Promise<IContactsInfo> {
    const { data } = await getInstance().get("/contacts/", config);

    return data;
}
export async function fetchContactsInfo(config = {}): Promise<IContactsInfo> {
    const { data } = await getInstance().get("/contacts/info/", config);

    return data;
}

