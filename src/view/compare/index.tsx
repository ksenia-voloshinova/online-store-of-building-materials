import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate,QueryClient } from "react-query";

import { fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import BreadcrumbsCompare from "@/components/compare/breadcrumbsCompare";
import Groups from "@/components/compare/groups";
import TitleCompare from "@/components/compare/titleCompare";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect> => {
        const queryClient = new QueryClient();        
        const cookies = context.req.headers["cookie"];
        const config = cookies
            ? {
                headers: {
                    Cookie: cookies
                }
            }
            : {};

        try {
           
            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );
            
        } catch (e) {
            errorService.getError(e);
        }

        return {
            props: {
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Compare: NextPage = () => {
    return (
        <div className={"container container-width pb-[80px]"}>
            <BreadcrumbsCompare />
            <TitleCompare />
            <Groups />
        </div>
    );
};

export default withAuthentication(withHeader(Compare));
