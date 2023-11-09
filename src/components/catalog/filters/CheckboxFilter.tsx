import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

import FilterContainer from "@/components/catalog/filters/FilterContainer";
import ColorCheckbox from "@/shared/UI/checkboxes/colorCheckbox";
import DefaultCheckbox from "@/shared/UI/checkboxes/defaultCheckbox";
import { useAppSelector } from "@/store/store";
import { FilterTypes, ICheckedParams, TCheckboxFilter } from "@/types/catalog";

interface ICheckboxFilterProps {
    filterData: TCheckboxFilter;
    onChange: (filter: ICheckedParams) => void;
}

const CheckboxFilter: FC<ICheckboxFilterProps> = ({ filterData, onChange }) => {
    const filters = useAppSelector(({ catalog }) => catalog.filters);
    const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
    const timeout = useRef<any>(null);
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        setCheckedFilters(filters[filterData.slug] as string[] ?? []);
    }, [filters]);
    
    async function debouncedChange(filters: string[]) {
        clearTimeout(timeout.current);
        
        timeout.current = await setTimeout(() => {
            onChange({
                [filterData.slug]: filters
            });
        }, 700);
    }
    
    async function handleCheckbox(slug: string) {
        const isChecked = (checkedFilters ?? [])?.some(filter => filter === slug);
        
        if (isChecked) {
            const filteredValues = checkedFilters.filter(filter => filter !== slug);

            setCheckedFilters(filteredValues);
            await debouncedChange(filteredValues);
        } else {
            const filters = [...checkedFilters, slug];

            setCheckedFilters(filters);
            await debouncedChange(filters);
        }
    }
    
    function renderFilter() {
        return filterData?.values.map(filter => {
            const { id, slug, isDisabled } = filter;
            const isChecked = checkedFilters.some(filter => filter === slug);
            
            switch (filterData.type) {
            case FilterTypes.checkboxText:
                return (
                    <DefaultCheckbox
                        key={id}
                        isChecked={isChecked && !isDisabled}
                        isDisabled={isDisabled}
                        onChange={() => handleCheckbox(slug)}
                    >
                        {"title" in filter ? filter?.title : ""}
                    </DefaultCheckbox>
                );
            case FilterTypes.checkboxImage:
                return (
                    <DefaultCheckbox
                        key={id}
                        isChecked={isChecked && !isDisabled}
                        isDisabled={isDisabled}
                        onChange={() => handleCheckbox(slug)}
                    >
                        <Image 
                            alt={"name" in filter ? filter?.name : ""}
                            height={52}
                            objectFit={"cover"}
                            src={"image" in filter ? filter?.image : ""}
                            width={152}
                        />
                    </DefaultCheckbox>
                );
            case FilterTypes.checkboxColor:
                return (
                    <ColorCheckbox
                        key={id}
                        color={"color" in filter ? filter?.color : ""}
                        isChecked={isChecked}
                        isDisabled={isDisabled}
                        title={"title" in filter ? filter?.title : ""}
                        onChange={() => handleCheckbox(slug)}
                    />
                );
            default:
                return;
            }
        });
    }
    
    return (
        <FilterContainer isOpen={filterData.isOpened} title={filterData.title}>
            {renderFilter()}
        </FilterContainer>
    );
};

export default CheckboxFilter;