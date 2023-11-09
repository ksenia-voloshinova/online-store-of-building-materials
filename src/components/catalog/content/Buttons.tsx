import { FC, useState } from "react";

import Filters from "@/components/catalog/filters";
import Varieties from "@/components/catalog/varieties";
import SquareButton from "@/shared/UI/buttons/squareButton";
import TranslatePopup from "@/shared/UI/popups/translatePopup";
import { refetchFilters } from "@/store/slices/catalogSlice";
import { useAppDispatch } from "@/store/store";

const Buttons: FC = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    function clearFilters() {
        dispatch(refetchFilters({}));
    }
    
    function openFiltersPopup() {
        setIsOpen(true);
    }

    function closeFiltersPopup() {
        setIsOpen(false);
    }
    
    return (
        <>
            <div className={"mt-[12px] md:mt-[17px] flex flex-wrap gap-[15px] md:gap-[17px]"}>
                <Varieties />
                <SquareButton styles={"lg:hidden bg-whiteWarm hover:bg-superSilver"} onClick={openFiltersPopup}>
                    все фильтры
                </SquareButton>
                <SquareButton styles={"lg:hidden bg-whiteWarm hover:bg-superSilver"} onClick={clearFilters}>
                    [х] сбросить
                </SquareButton>
            </div>
            <TranslatePopup isOpen={isOpen} onClose={closeFiltersPopup}>
                <Filters />
            </TranslatePopup>
        </>
    );
};

export default Buttons;