import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";

import {
    fetchCatalog,
    fetchCatalogFilters,
    fetchCatalogInfo,
    fetchCatalogSorts,
    fetchCatalogVarieties,
    fetchCrossSaleProducts,
    fetchGlobalInfo,
    fetchPageType,
    fetchProductDetail,
    fetchProductDetailInfo,
    fetchPromotionsCatalog,
    fetchRecommendationProducts,
    fetchViewedProducts
} from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import Catalog from "@/components/catalog";
import Product from "@/components/product";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSeo from "@/hocs/withSeo";
import withSubdomain from "@/hocs/withSubdomain";
import { ROUTES } from "@/routes";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import FilterService from "@/services/filterService";
import paramsService from "@/services/paramsService";
import { setFilters, setFiltersData, setPage, setSort } from "@/store/slices/catalogSlice";
import { wrapper } from "@/store/store";
import { IPageProps, IPageRedirect } from "@/types";
import { ICheckedParams } from "@/types/catalog";

interface ICatalogPageProps extends IPageProps {
    params: ICheckedParams;
    pageType: string;
}

interface IComponents {
    [name: string]: JSX.Element;
}

const components: IComponents = {
    catalog: <Catalog />,
    detail: <Product />
};

export const getServerSideProps = withSubdomain(wrapper.getServerSideProps(
    (store) => async (
        context: GetServerSidePropsContext
    ): Promise<{props: ICatalogPageProps} | IPageRedirect | any> => {
        const { query } = context;
        const queryClient = new QueryClient();
        const pathTypes = Array.isArray(query.slug) ? query.slug.join("/") : query.slug ?? "";
        const queryParams = { ...query };
        const cookies = context.req.headers["cookie"];
        const config = cookies
            ? {
                headers: {
                    Cookie: cookies
                }
            }
            : {};
        let verifiedQueryParams = {};
        let pageType = "";
        let seoData = {};

        delete queryParams.slug;


  

        try {
            pageType = await fetchPageType(Array.isArray(query.slug) ? query.slug : [], config);
            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );
            if (pageType === "catalog") {
                // get filters
                const filtersFetch = await queryClient.fetchQuery(
                    QUERY_KEYS.filters, () => fetchCatalogFilters(pathTypes, {
                        ...config,
                        params: queryParams
                    })
                );

                // validate filters in query params
                const checkedFilters = new FilterService(filtersFetch)
                    .getVerifiedQueryFilters(query);

                // get sorts
                const sortsFetch = await queryClient.fetchQuery(
                    QUERY_KEYS.sorts, () => fetchCatalogSorts(pathTypes, config)
                );
                // validate sort in query params
                // default sort - first sort in the fetch sort list
                const checkedSort = sortsFetch
                    .find(sort => sort.slug === query?.sort)?.slug ?? sortsFetch[0].slug;

                // get products, varieties and pagination info
                const page = queryParams.page ?? "1";
                const sort = queryParams.sort ?? checkedSort;
                const catalogFetch = await queryClient.fetchQuery(
                    [QUERY_KEYS.catalog, checkedFilters, page, sort],
                    () => fetchCatalog(pathTypes, {
                        ...config,
                        params: {
                            page,
                            sort,
                            ...queryParams
                        }
                    })
                );
                // validate page in query params
                // default page - page from fetch
                const checkedPage = query?.page ?? catalogFetch.page.toString() ?? "1";

                // get catalog info
                const { seo } = await queryClient.fetchQuery(
                    QUERY_KEYS.catalogInfo,
                    () => fetchCatalogInfo(pathTypes, config)
                );

                seoData = seo;

                // get promotions that depended on filters
                await queryClient.prefetchQuery(
                    QUERY_KEYS.promotions,
                    () => fetchPromotionsCatalog(pathTypes, {
                        params: checkedFilters
                    })
                );

                // get catalog varieties
                await queryClient.prefetchQuery(
                    QUERY_KEYS.varieties,
                    () => fetchCatalogVarieties(pathTypes, config)
                );

                verifiedQueryParams = {
                    page: checkedPage,
                    sort: checkedSort,
                    ...checkedFilters
                };

                // set store data
                await store.dispatch(setFiltersData(filtersFetch));
                await store.dispatch(setFilters(checkedFilters));
                await store.dispatch(setPage(checkedPage));
                await store.dispatch(setSort(checkedSort));
            } else if (pageType === "detail") {
                // get product detail info
                const { seo } = await queryClient.fetchQuery(
                    QUERY_KEYS.productDetailInfo,
                    () => fetchProductDetailInfo(pathTypes, config)
                );

                seoData = seo;

                // get product detail

                const productDetail = await queryClient.fetchQuery(
                    QUERY_KEYS.productDetail,
                    () => fetchProductDetail(pathTypes, config)
                );

                // get viewed products
                await queryClient.prefetchQuery(
                    QUERY_KEYS.viewed,
                    () => fetchViewedProducts(config)
                );

                // get recommendation products
                await queryClient.prefetchQuery(
                    QUERY_KEYS.recommendation,
                    () => fetchRecommendationProducts(pathTypes, {
                        ...config,
                        params: queryParams
                    })
                );

                // get cross sale products
                await queryClient.prefetchQuery(
                    QUERY_KEYS.crossSale,
                    () => fetchCrossSaleProducts(pathTypes, {
                        ...config,
                        params: queryParams
                    })
                );

                verifiedQueryParams = queryParams;
                
            } else {
                return {
                    notFound: true,
                };
            }
        } catch (error: any) {
            return errorService.getError(error);
        }

        return {
            props: {
                pageType,
                auth: await authService.getaAuthStatus(context),
                seo: seoData ?? null,
                params: verifiedQueryParams,
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
));

const CatalogPage: NextPage<ICatalogPageProps> = ({ params, pageType }) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined" || !params) return;

        paramsService.setParamsObject(params);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    async function handleBack() {
        router.reload();
    }

    return (
        <main className={"container"}>
            {components[pageType]}
        </main>
    );
};

export default withAuthentication(withSeo(withHeader(CatalogPage)));
