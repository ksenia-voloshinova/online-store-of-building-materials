import { FC } from "react";

import CompareIcon from "@/assets/icons/compare-sm.svg";
import useCompare from "@/hooks/useCompare";

interface ICompare {
    id: number;
    elementId: number;
}

const Compare: FC<ICompare> = ({ id, elementId }) => {
    const { currentProduct, toggleProductCompare } = useCompare(id, elementId);

    return (
        <button
            className={"group flex flex-nowrap items-center gap-[5px] cursor-pointer"}
            onClick={toggleProductCompare}
        >
            <CompareIcon className={`${currentProduct ? "stroke-yellowWarm" : "stroke-cyanBlueGray"}
                group-hover:stroke-yellowWarm duration-[300ms]`} />
            <p className={`text-sm md:text-[16px] 
            ${currentProduct ? "text-yellowWarm" : "text-cyanBlueGray"} group-hover:text-yellowWarm duration-[300ms]`}
            >
                {currentProduct ? "В сравнении" : "Сравнить"}
            </p>
        </button>
    );
};

export default Compare;
