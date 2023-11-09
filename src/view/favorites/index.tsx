import { config } from "dotenv";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate,QueryClient } from "react-query";

import { fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import BreadcrumbsFavorites from "@/components/favorite/breadcrumbsFavorites";
import Content from "@/components/favorite/content";
import TitleFavorites from "@/components/favorite/titleFavorites";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import LkPageContainer from "@/shared/containers/lkPageContainer";
import { useAppSelector } from "@/store/store";
import { IPageProps, IPageRedirect } from "@/types";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<IPageProps | IPageRedirect | any>  => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"]?.trim(),
            }
        };

        try {
            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );
        } catch (e) {
            return errorService.getError(e);
        }

        return {
            props: {
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Favorite: NextPage = () => {
    const isAuth = useAppSelector(({ user }) => user.isAuth);

    return (
        <>
            {isAuth ? (
                <LkPageContainer title={"Избранное"}>
                    <Content />
                </LkPageContainer>
            ) : (
                <div className={"container container-width pb-[80px]"}>
                    <BreadcrumbsFavorites />
                    <TitleFavorites />
                    <Content />
                </div>
            )}
        </>
    );
};

export default withAuthentication(withHeader(Favorite));
