import { ComponentType } from "react";

import HeadSeo from "@/shared/headSeo";
import { ISeo } from "@/types";

interface IWithSeo {
    seo?:  object | ISeo;
}

function withSeo<T extends IWithSeo>(WrappedComponent: ComponentType<T>) {
    return (props: any) => (
        <>
            <HeadSeo meta={props?.seo?.meta ?? {}} title={props?.seo?.title ?? ""} />
            <WrappedComponent {...props} />
        </>
    );
}

export default withSeo;
