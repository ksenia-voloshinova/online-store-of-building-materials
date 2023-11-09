import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import FilterContainer from "@/components/catalog/filters/FilterContainer";
import MultiRangeSlider from "@/shared/UI/slider/multiRangeSlider";
import { useAppSelector } from "@/store/store";
import { ICheckedParams, ISliderFilter } from "@/types/catalog";

interface ISliderFilterProps {
    filterData: ISliderFilter;
    onChange: (filter: ICheckedParams) => void;
}

const SliderFilter: FC<ISliderFilterProps> = ({ filterData, onChange }) => {
    const router = useRouter();
    const filters = useAppSelector(({ catalog }) => catalog.filters);
    const paramStartKey = `${filterData.slug}Start`;
    const paramEndKey = `${filterData.slug}End`;
    const min = filterData.range.min;
    const max = filterData.range.max;
    const [checkedFilters, setCheckedFilters] = useState<{min: number; max: number}>({
        min: +(router.query[paramStartKey] ?? min),
        max: +(router.query[paramEndKey] ?? max),
    });

    useEffect(() => {
        setCheckedFilters({
            min: filters[paramStartKey] as number ?? filterData.range.min,
            max: filters[paramEndKey] as number ?? filterData.range.max
        });
    }, [filterData, filters]);

    function onChangeRange(min: number, max: number) {
        onChange({
            [paramStartKey]: min,
            [paramEndKey]: max,
        });
    }

    return (
        <FilterContainer isOpen={filterData.isOpened} title={filterData.title}>
            <MultiRangeSlider
                affordableValues={checkedFilters}
                max={max}
                min={min}
                onChange={(min, max) => onChangeRange(min, max)}
            />
        </FilterContainer>
    );
};

export default SliderFilter;
