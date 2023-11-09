import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import { fetchGlobalInfo, fetchOrders } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import OrdersComponent from "@/components/lk/orders";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import LkPageContainer from "@/shared/containers/lkPageContainer";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<IPageProps | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
            }
        };

        try {
            await queryClient.prefetchQuery(
                QUERY_KEYS.orders,
                () => fetchOrders({
                    ...config,
                    params: {
                        page: 1,
                    }
                })
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
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Orders: NextPage = () => {
    return (
        <LkPageContainer title={"Мои заказы"}>
            <OrdersComponent />
        </LkPageContainer>
    );
};

export default withAuthentication(withHeader(Orders));
