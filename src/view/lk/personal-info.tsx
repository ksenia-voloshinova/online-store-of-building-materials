import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { dehydrate,QueryClient } from "react-query";

import { fetchGlobalInfo } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import withAuthentication from "@/hocs/withAuthentication";
import withHeader from "@/hocs/withHeader";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import LkPageContainer from "@/shared/containers/lkPageContainer";
import PersonalInfoForm from "@/shared/forms/personalInfoForm";
import UserAgreement from "@/shared/userAgreement";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";

export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext):Promise<IPageProps | IPageRedirect | any> => {
        const queryClient = new QueryClient();

        let globalInfo = {} as IGlobalInfoData; 

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
                global: globalInfo

            }
        };
    }
);

const PersonalInfo: NextPage = () => {
    return (
        <LkPageContainer title={"Личные данные"}>
            <PersonalInfoForm />
            <UserAgreement />
        </LkPageContainer>
    );
};

export default withAuthentication(withHeader(PersonalInfo));