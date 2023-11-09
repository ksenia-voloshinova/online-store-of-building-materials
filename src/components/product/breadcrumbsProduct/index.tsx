import useProductDetailInfoData from "@/hooks/api/useProductDetailInfoData";
import Breadcrumbs from "@/shared/breadcrumbs";
import Interceptor from "@/shared/interceptor";

const BreadcrumbsProduct = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailInfoData();
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить хлебные крошки"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <div className={"mt-[13px]"}>
                <Breadcrumbs data={data?.breadcrumbs ?? []} />
            </div>
        </Interceptor>
    );
};

export default BreadcrumbsProduct;