import { useRouter } from "next/router";
import { FC } from "react";
import { useDispatch } from "react-redux";

import useCatalogVarieties from "@/hooks/api/useCatalogVarieties";
import paramsService from "@/services/paramsService";
import Interceptor from "@/shared/interceptor";
import SquareButton from "@/shared/UI/buttons/squareButton";
import { refetchFilters } from "@/store/slices/catalogSlice";
import { useAppSelector } from "@/store/store";

const Varieties: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoading, isFetching, isError, data: varieties } = useCatalogVarieties();
    const filters = useAppSelector(({ catalog }) => catalog.filters);

    async function handleVariate(path: string) {
        const currentPath = path.replace("/catalog/", "");
        // @ts-ignore

        dispatch(refetchFilters(filters));
        paramsService.setParam("page", 1);
        await router.push(`${currentPath}${window.location.search}`);
    }

    function renderVarieties() {
        return varieties?.map(variate => {
            const { id, title, isChecked, slug, link } = variate;

            return (
                <SquareButton
                    key={id}
                    styles={`${isChecked && "bg-yellowWarm text-white"}`}
                    onClick={() => handleVariate(link)}
                >
                    {title}
                </SquareButton>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить разновидности типа"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {renderVarieties()}
        </Interceptor>
    );
};

export default Varieties;
