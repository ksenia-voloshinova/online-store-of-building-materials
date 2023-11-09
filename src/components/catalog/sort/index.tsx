import { Listbox, Transition } from "@headlessui/react";
import React, { FC, useEffect, useState } from "react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import useSortsData from "@/hooks/api/useSortsData";
import paramsService from "@/services/paramsService";
import Interceptor from "@/shared/interceptor";
import { setSort } from "@/store/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Sort: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, isFetching, isError, data: sorts } = useSortsData();
    const sort = useAppSelector(({ catalog }) => catalog.sort);
    const selectedSortName = sorts?.find(sortItem => sortItem.slug === sort)?.title;
    
    async function onChange(sort: string) {
        paramsService.setParam("sort", sort);
        await dispatch(setSort(sort));
    }
    
    function renderOptions() {
        return sorts?.map(sort => {
            const { id, title, slug } = sort;
            
            return (
                <Listbox.Option
                    key={id}
                    disabled={false}
                    value={slug}
                >
                    {({ active }) => (
                        <div
                            className={`px-[16px] py-[4px] cursor-pointer duration-[100ms] ${
                                active ? "bg-yellowWarm text-white" : "bg-white text-black"
                            }`}
                        >
                            {title}
                        </div>
                    )}
                </Listbox.Option>
            );
        });
    }
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить сортировки"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <Listbox 
                value={sort}
                onChange={onChange}
            >
                {({ open }) => (
                    <div className={"relative z-[10]"}>
                        <Listbox.Button
                            className={"px-[16px] py-[4px] flex justify-between items-center " +
                                "w-[190px] bg-white border-1 border-cyanBlueMiddle text-sm"}
                        >
                            {selectedSortName}
                            <Arrow className={`fill-cyanBlueGray ${open && "rotate-180"} duration-[300ms]`} />
                        </Listbox.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options className={"absolute w-full bg-white border-1 " +
                                "border-cyanBlueLight"}
                            >
                                {renderOptions()}
                            </Listbox.Options>
                        </Transition>
                    </div>
                )}
            </Listbox>
        </Interceptor>
    );
};

export default Sort;