import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import { fetchGlobalInfo, fetchMainInfo, fetchPromotionsMain } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import Advantages from "@/components/main/advantages";
import Banner from "@/components/main/banner";
import Catalog from "@/components/main/catalog";
import Employees from "@/components/main/employees";
import Info from "@/components/main/info";
import PromotionsMain from "@/components/main/promotionsMain";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSeo from "@/hocs/withSeo";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
            }
        };
        let seoData = {};

        try {
            await queryClient.prefetchQuery(
                QUERY_KEYS.promotionsMain,
                () => fetchPromotionsMain(config)
            );
            const { seo } = await queryClient.fetchQuery(
                QUERY_KEYS.infoMain,
                () => fetchMainInfo(config)
            );

            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );
            seoData = seo;
        } catch (e) {
            return errorService.getError(e);
        }

        return {
            props: {
                seo: seoData ?? null,
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);
const Main: NextPage = () => {
    return (
        <div className={"container-width pb-[50px] bg-desaturatedWhiteWarm"}>
            <Banner />
            <PromotionsMain />
            <Info />
            <Catalog />
            <Advantages />
            <Employees />
        </div>
    );
};

export default withAuthentication(withSeo(withHeader(Main)));
