import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import { fetchGetAddresses, fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import AddressesList from "@/components/lk/addressesList";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import LkPageContainer from "@/shared/containers/lkPageContainer";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
            }
        };
             
        try {
            await queryClient.prefetchQuery(
                QUERY_KEYS.addresses,
                () => fetchGetAddresses(config)
            );
            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );   
        } catch (e) {
            return errorService.getError(e);
        }

        return {
            props: {
                seo: {},
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Addresses: NextPage = () => {
    return (
        <LkPageContainer title={"Мои адреса"}>
            <p>На этой странице вы можете редактировать старые или добавлять новые адреса для доставки.</p>
            <AddressesList />
        </LkPageContainer>
    );
};

export default withAuthentication(withHeader(Addresses));
