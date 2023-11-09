import { FC } from "react";

import useProductionInfoData from "@/hooks/api/useProductionInfoData";
import Breadcrumbs from "@/shared/breadcrumbs";
import Interceptor from "@/shared/interceptor";

const BreadcrumbsProduction: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductionInfoData();
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить хлебные крошки главной каталога"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <Breadcrumbs data={data?.breadcrumbs ?? []} />
        </Interceptor>
    );
};

export default BreadcrumbsProduction;