import React, { FC } from "react";

import DefaultOutsideSwitcher from "@/shared/UI/switcher/defaultOutsideSwitcher";

interface ICharacteristicFilter {
    onChange: (showDiff: boolean) => void;
}

const CharacteristicFilter: FC<ICharacteristicFilter> = ({ onChange }) => {
    return (
        <div className={"mt-[20px] flex flex-wrap items-center gap-[20px] text-[18px]"}>
            <p>Показать:</p>
            <div className={"flex items-center gap-[10px] md:gap-[20px]"}>
                <DefaultOutsideSwitcher
                    defaultValue={false}
                    switchers={["Различающиеся характеристики", "Все характеристики"]}
                    onClick={onChange}
                />
            </div>
        </div>
    );
};

export default CharacteristicFilter;
