import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { QueryClient } from "react-query";

import { fetchGetCompare } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";

// компонент высшего порядка для редиректа по регионам
// должен подключаться в getServerSideProps на каждой странице

function withSubdomain(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const queryClient = new QueryClient();

        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
            }
        };

        await queryClient.prefetchQuery(
            QUERY_KEYS.compare,
            () => fetchGetCompare(config)
        );

        return await gssp(context);
    };
}

export default withSubdomain;
