import { config } from "dotenv";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate,QueryClient } from "react-query";

import { fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import PageFormContainer from "@/shared/containers/authPageContainer";
import ChangePasswordConfirmForm from "@/shared/forms/changePasswordConfirmForm";
import { IPageProps, IPageRedirect } from "@/types";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext):Promise<IPageProps | IPageRedirect | any> => {
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

const ChangePasswordConfirm: NextPage = () => {
    return (
        <PageFormContainer>
            <ChangePasswordConfirmForm />
        </PageFormContainer>
    );
};

export default withAuthentication(withHeader(ChangePasswordConfirm));