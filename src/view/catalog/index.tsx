import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
    fetchCatalogSectionsInfo,
    fetchGlobalInfo,
    fetchProduction,
    fetchPromotionsCatalog
} from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import Banner from "@/components/production/banner";
import Catalog from "@/components/production/catalog";
import Info from "@/components/production/info";
import PromotionsProduction from "@/components/production/promotionsProduction";
import Statistics from "@/components/production/statistics";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSeo from "@/hocs/withSeo";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        let seoData = {};
        const cookies = context.req.headers["cookie"];
        const config = cookies
            ? {
                headers: {
                    Cookie: cookies
                }
            }
            : {};

        try {
            const { seo } = await queryClient.fetchQuery(
                QUERY_KEYS.productionInfo,
                () => fetchCatalogSectionsInfo(config)
            );

            seoData = seo;

            await queryClient.prefetchQuery(
                QUERY_KEYS.productionCatalog,
                () => fetchProduction(config)
            );
            await queryClient.prefetchQuery(
                QUERY_KEYS.promotionsMain,
                () => fetchPromotionsCatalog("", config)
            );
            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );
        } catch (e: any) {
            return errorService.getError(e);
        }

        return {
            props: {
                seo: seoData,
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Production: NextPage<IPageProps> = () => {
    return (
        <main className={"container-width"}>
            <Banner/>
            <PromotionsProduction />
            <Catalog/>
            <Statistics/>
            <Info />
        </main>
    );
};

export default withAuthentication(withSeo(withHeader(Production)));
