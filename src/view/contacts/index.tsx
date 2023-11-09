import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { dehydrate,QueryClient } from "react-query";

import { fetchContacts, fetchContactsInfo, fetchGlobalInfo, fetchMainInfo,fetchPromotionsMain } from "@/api/api";
import { QUERY_KEYS } from "@/api/queryKeys";
import BreadcrumbsContacts from "@/components/contacts/breadcrumbsContacts";
import ContactItem from "@/components/contacts/contactItem";
import ContactsGrid from "@/components/contacts/contactsGrid";
import TitleContacts from "@/components/contacts/titleContacts";
import withHeader from "@/hocs/withHeader";
import withSeo from "@/hocs/withSeo";
import withSubdomain from "@/hocs/withSubdomain";
import authService from "@/services/authService";
import errorService from "@/services/errorService";
import { IPageProps, IPageRedirect } from "@/types";
import { IGlobalInfoData } from "@/types/info";


export const getServerSideProps: GetServerSideProps = withSubdomain(
    async (context: GetServerSidePropsContext): Promise<{ props: IPageProps } | IPageRedirect | any> => {
        const queryClient = new QueryClient();
        const config = {
            headers: {
                Cookie: context.req.headers["cookie"]?.trim(),
            }
        };
        let seoData = {};
       
        try {
            await queryClient.prefetchQuery(
                QUERY_KEYS.contactsMain,
                () => fetchContacts(config)
            );

            const { seo } = await queryClient.fetchQuery(
                QUERY_KEYS.contactsMainInfo,
                () => fetchContactsInfo(config)
            );

            await queryClient.prefetchQuery(
                QUERY_KEYS.globalInfo,
                () => fetchGlobalInfo(config)
            );

            seoData = { ...seo };

        } catch (e) {
            return errorService.getError(e);
        }

        return {
            props: {
                seo: seoData ?? null,
                auth: await authService.getaAuthStatus(context),
                dehydratedState: dehydrate(queryClient),
            }
        };
    }
);



const Contacts = () => {
    return (
        <div className={"container container-width pb-[80px]"}>
            <BreadcrumbsContacts/>
            <TitleContacts/>
            <ContactsGrid/>
        </div>
    );
};

export default withSeo(withHeader(Contacts));
