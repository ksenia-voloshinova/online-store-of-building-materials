import React, { FC, useEffect, useState } from "react";

import useCatalogData from "@/hooks/api/useCatalogData";
import paramsService from "@/services/paramsService";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import Pagination from "@/shared/pagination";
import { setPage } from "@/store/slices/catalogSlice";
import { useAppDispatch } from "@/store/store";

const PaginationCatalog: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isFetching, isError, data: catalog } = useCatalogData();
    const [currentPage, setCurrentPage] = useState<number>(catalog?.page ?? 1);
    const pageCount = catalog ? Math.ceil(catalog.productsCount / catalog.limit) : 0;

    useEffect(() => {
        if (!catalog) return;

        setCurrentPage(catalog.page);
    }, [catalog]);

    async function handlePage(currentPage: number) {
        paramsService.setParam("page", currentPage);
        await dispatch(setPage(currentPage));
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить пагинацию"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader height={40} width={40} />}
        >
            <Pagination currentPage={currentPage} pages={pageCount} onClick={handlePage} />
        </Interceptor>
    );
};

export default PaginationCatalog;
