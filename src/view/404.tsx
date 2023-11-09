import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate,QueryClient } from "react-query";

import { fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import Error from "@/assets/icons/404.svg";
import withHeader from "@/hocs/withHeader";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";

export const getServerSideProps: GetServerSideProps = 
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"],
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
                dehydratedState: dehydrate(queryClient),

            }
        };
    };
    
const Page404: NextPage = () => {
    return (
        <div className={"container container-width flex flex-col justify-center items-center gap-[20px] " +
            "h-[calc(100vh-65px)] md:h-[calc(100vh-138px)] bg-desaturatedWhiteWarm"}
        >
            <Error />
            <p>Страница не найдена</p>
        </div>
    );
};

export default withHeader(Page404);