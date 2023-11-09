import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
    fetchGetAddresses,
    fetchGlobalInfo,
    fetchPaymentTypes,
    fetchShippingPickup,
    fetchShippingTypes
} from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import BreadcrumbsBasket from "@/components/basket/breadcrumbsBasket";
import Content from "@/components/basket/content";
import TitleBasket from "@/components/basket/titleBasket";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";

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
                QUERY_KEYS.paymentTypes,
                () => fetchPaymentTypes(config)
            );
            await queryClient.prefetchQuery(
                QUERY_KEYS.shippingTypes,
                () => fetchShippingTypes(config)
            );
            await queryClient.prefetchQuery(
                QUERY_KEYS.pickupAddresses,
                () => fetchShippingPickup(config)
            );
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
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);

const Basket: NextPage = () => {
    return (
        <div className={"container container-width pb-[80px]"}>
            <BreadcrumbsBasket />
            <TitleBasket />
            <div className={"mt-[20px]"}>
                <Content />
            </div>
        </div>
    );
};

export default withAuthentication(withHeader(Basket));
