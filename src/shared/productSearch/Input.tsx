import { Combobox } from "@headlessui/react";
import React, { FC } from "react";

import Search from "@/assets/icons/searchBlack.svg";

interface ISearchInput {
    value: string;
    onChange: (value: string) => void;
}

const Input: FC<ISearchInput> = ({ value, onChange }) => {
    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
    }

    return (
        <div className="relative flex w-full
            overflow-hidden border-1 border-cyanBlueLight rounded"
        >
            <div className={"absolute left-[16px] top-[12px]"}>
                <Search className={"fill-cyanBlueGray"} height={32} width={32} />
            </div>
            <Combobox.Input
                autoComplete={"off"}
                placeholder={"Поиск товаров"}
                value={value}
                className="p-[12px] pl-[44px] text-sm text-gray-900
                w-full border-none focus:ring-0 outline-none placeholder:text-cyanBlueGray"
                onChange={onChangeInput}
            />
        </div>
    );
};

export default Input;