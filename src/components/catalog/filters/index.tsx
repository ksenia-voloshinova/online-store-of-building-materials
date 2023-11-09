import React, { FC } from "react";

import CheckboxFilter from "@/components/catalog/filters/CheckboxFilter";
import SliderFilter from "@/components/catalog/filters/SliderFilter";
import useFiltersData from "@/hooks/api/useFiltersData";
import Interceptor from "@/shared/interceptor";
import { refetchFilters } from "@/store/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { FilterTypes, ICheckedParams, ISliderFilter, TCheckboxFilter } from "@/types/catalog";

const Filters: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isFetching, isError } = useFiltersData();
    const filtersData = useAppSelector(({ catalog }) => catalog.filtersData);
    const filters = useAppSelector(({ catalog }) => catalog.filters);

    async function onChange(filter: ICheckedParams) {
        dispatch(refetchFilters({
            ...filters,
            ...filter,
        }));
    }

    function renderFilters() {
        return filtersData?.map((filter: TCheckboxFilter | ISliderFilter) => {
            if (filter.type === FilterTypes.slider) {
                return (
                    <SliderFilter
                        key={filter.slug}
                        filterData={filter}
                        onChange={onChange}
                    />
                );
            } else {
                return (
                    <CheckboxFilter
                        key={filter.slug}
                        filterData={filter}
                        onChange={onChange}
                    />
                );
            }
        });
    }
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить фильтры"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <form>
                <ul className={"flex flex-col gap-[14px]"}>
                    {renderFilters()}
                </ul>
            </form>
        </Interceptor>
    );
};

export default Filters;