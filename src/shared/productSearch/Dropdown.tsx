import { Combobox } from "@headlessui/react";
import React, { FC } from "react";

import { IProduct } from "@/types/production";

interface IDropdown {
    inputValue: string;
    products: IProduct[];
}

const Dropdown: FC<IDropdown> = ({  inputValue, products }) => {
    function renderProducts() {
        if (products.length === 0) {
            return (
                <div className={"flex justify-center items-center h-full"}>
                    Товар не найден
                </div>
            );
        }

        return products.map(product => {
            const { id, link, value } = product;
            
            return (
                <a key={id} href={link ?? "#"} rel="noreferrer" target={"_blank"}>
                    <Combobox.Option
                        value={inputValue}
                        className={({ active }) => `relative cursor-default select-none p-[15px] 
                        cursor-pointer duration-[300ms] ${active 
                    ? "bg-superSilver" 
                    : "text-gray-900"}`}
                    >
                        {value}
                    </Combobox.Option>
                </a>
            );
        });
    }

    return (
        <Combobox.Options className={"h-full"}>
            {renderProducts()}
        </Combobox.Options>
    );
};

export default Dropdown;