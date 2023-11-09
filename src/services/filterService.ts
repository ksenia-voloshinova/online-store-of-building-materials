import { ParsedUrlQuery } from "querystring";

import {
    ICheckedParams,
    ISliderFilter,
    IVerifiedFilters,
    TCheckboxFilter,
    TCheckboxFilterValue,
    TFilter
} from "@/types/catalog";

// service for query params filters validation with fetch filters
// return object with valid filters

class FilterService {
    filters: TFilter | [];

    constructor(filters: TFilter) {
        this.filters = filters ?? [];
    }

    getActiveFilter(slug: string) {
        return this.filters?.find(filter => filter.slug === slug);
    }

    getActiveFilterValue(value: string | number| undefined, filterValues: TCheckboxFilterValue[]) {
        return filterValues.find(filter => filter.slug === value && !filter.isDisabled);
    }

    getVerifiedFilterValues(paramsValues: string[], filterValues: TCheckboxFilterValue[]) {
        return paramsValues.filter(v => {
            const activeFilterItem = this.getActiveFilterValue(v, filterValues);

            if (!activeFilterItem) return;

            return v;
        });
    }

    getVerifiedQueryFilters(query: ParsedUrlQuery | ICheckedParams) {
        return Object.entries(query)
            .reduce<IVerifiedFilters>((acc, [key, value]) => {
                const isSliderMin = key.includes("Start");
                const isSliderMax = key.includes("End");

                if (isSliderMin || isSliderMax) {
                    const currentValue = Number(value);
                    const currentKey = key.replace(/Start|End/gm, "");
                    const activeFilter = this.getActiveFilter(currentKey) as ISliderFilter;

                    if (!activeFilter) return acc;

                    const min = activeFilter.range.min;
                    const max = activeFilter.range.max;

                    if (!(currentValue >= min && currentValue <= max))
                        return {
                            ...acc,
                            [key]: isSliderMin ? min : max,
                        };

                    return {
                        ...acc,
                        [key]: currentValue,
                    };
                } else {
                    const currentKey = key.replace("[]", "");
                    const activeFilter = this.getActiveFilter(currentKey) as TCheckboxFilter;

                    if (!activeFilter) return acc;

                    // query params return array of filters or string of one filter
                    if (Array.isArray(value)) {
                        const verifyFilterItems = this.getVerifiedFilterValues(value, activeFilter.values);

                        if (verifyFilterItems.length === 0) return acc;

                        return {
                            ...acc,
                            [currentKey]: verifyFilterItems,
                        };
                    } else {
                        const activeFilterItem =
                            this.getActiveFilterValue(value as string | number, activeFilter.values);

                        if (!activeFilterItem) return acc;

                        return {
                            ...acc,
                            [currentKey]: [value],
                        };
                    }
                }
            }, {});
    }
}

export default FilterService;
