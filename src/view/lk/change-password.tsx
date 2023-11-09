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
import LkPageContainer from "@/shared/containers/lkPageContainer";
import ChangePasswordAuthForm from "@/shared/forms/changePasswordAuthForm";
import ChangePasswordForm from "@/shared/forms/changePasswordForm";
import { useAppSelector } from "@/store/store";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

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

const ChangePassword: NextPage = () => {
    const isAuth = useAppSelector(({ user }) => user.isAuth);

    return (
        <>
            {isAuth ? (
                <LkPageContainer title={"Смена пароля"}>
                    <ChangePasswordAuthForm />
                </LkPageContainer>
            ) : (
                <PageFormContainer>
                    <ChangePasswordForm />
                </PageFormContainer>
            )}
        </>
    );
};

export default withAuthentication(withHeader(ChangePassword));