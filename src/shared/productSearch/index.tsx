import { Combobox, Transition } from "@headlessui/react";
import React, { FC, useState } from "react";

import useProductsData from "@/hooks/api/useProductsData";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/shared/loader";
import Dropdown from "@/shared/productSearch/Dropdown";
import Input from "@/shared/productSearch/Input";

const Search: FC = () => {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value);
    const {
        isLoading,
        isFetching,
        isError,
        data: products,
        error
    } = useProductsData(debouncedValue);

    function renderSearchList() {
        if (isLoading || isFetching) return (
            <div className={"flex justify-center items-center h-full"}>
                <Loader />
            </div>
        );

        if (isError) return (
            <div className={"flex justify-center items-center h-full"}>
                Ошибка поиска товара
            </div>
        );

        return (
            <>
                {products && <Dropdown inputValue={value} products={products} />}
            </>
        );
    }
    
    return (
        <Combobox value={value}>
            <div className="relative w-full">
                <Input value={value} onChange={(val) => setValue(val)} />
                <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {!!value.length && (
                        <div className="
                        absolute z-[100] mt-[10px] 
                        max-h-60 h-[240px] w-full overflow-auto bg-white
                        rounded-md py-1 text-base shadow-lg ring-1 ring-black 
                        ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {renderSearchList()}
                        </div>
                    )}
                </Transition>
            </div>
        </Combobox>
    );
};

export default Search;