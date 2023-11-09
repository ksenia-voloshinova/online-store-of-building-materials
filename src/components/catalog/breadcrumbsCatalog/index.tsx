import { FC } from "react";

import useCatalogInfoData from "@/hooks/api/useCatalogInfoData";
import Breadcrumbs from "@/shared/breadcrumbs";
import Interceptor from "@/shared/interceptor";

const BreadcrumbsCatalog: FC = () => {
    const { isLoading, isFetching, isError, data } = useCatalogInfoData();
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить хлебные крошки каталога"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <Breadcrumbs data={data?.breadcrumbs ?? []} />
        </Interceptor>    
    );
};

export default BreadcrumbsCatalog;