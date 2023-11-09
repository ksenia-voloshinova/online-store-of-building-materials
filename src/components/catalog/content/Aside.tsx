import { Disclosure, Transition } from "@headlessui/react";
import { FC } from "react";

import Arrow from "@/assets/icons/arrow-light.svg";
import Filters from "@/components/catalog/filters";
import SquareButton from "@/shared/UI/buttons/squareButton";
import { refetchFilters } from "@/store/slices/catalogSlice";
import { useAppDispatch } from "@/store/store";

const Aside: FC = () => {
    const dispatch = useAppDispatch();
    
    function clearFilters() {
        dispatch(refetchFilters({}));
    }
    
    return (
        <div className={"hidden sticky top-[180px] lg:block h-[calc(100vh-200px)] scrollhost overflow-auto " +
            "min-w-[310px] max-w-[310px] 3xl:min-w-[360px]"}
        >
            <div className={"min-w-[275px] max-w-[275px] 3xl:min-w-[328px]"}>
                <Filters />
                <SquareButton
                    type={"button"}
                    styles={"mt-[20px] sticky bottom-[0px] w-full " +
                        "text-2xl text-blueMagenta bg-cyanBlueLight"}
                    onClick={clearFilters}
                >
                    Очистить
                </SquareButton>
            </div>
        </div>
    );
};

export default Aside;