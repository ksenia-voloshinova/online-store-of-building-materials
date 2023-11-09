import Head from "next/head";
import { FC } from "react";

import { ISeo } from "@/types";

const HeadSeo: FC<ISeo> = ({
    title,
    meta
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta content={meta.description} name="description" />
            <meta content={meta.keywords} name="keywords" />
        </Head>
    );
};

export default HeadSeo;