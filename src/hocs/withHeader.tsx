import { ComponentType } from "react";

import Header from "@/shared/header";




function withHeader(WrappedComponent: any):any {
    return (props: any) => (
        <>
            <Header/>
            <WrappedComponent {...props} />
        </>
    );
}

export default withHeader;
