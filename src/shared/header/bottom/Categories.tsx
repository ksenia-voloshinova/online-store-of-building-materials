import { FC, useState } from "react";

import BurgerIcon from "@/assets/icons/burger.svg";
import CategoriesPopup from "@/shared/UI/popups/categoriesPopup";


const Categories: FC = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    
    function openPopup() {
        setIsOpenPopup(true);
    }
    
    function closePopup() {
        setIsOpenPopup(false);
    }
    
    return (
        <>
            <button 
                className={"px-[12px] py-[12px] " +
                "flex items-center gap-[6px] min-w-[102px] " +
                "bg-yellowWarm border-1 border-cyanBlueLight rounded"
                }
                onClick={openPopup}
            >
                <BurgerIcon width={10} />
                <p className={"text-sm"}>Каталог</p>
            </button>
            <CategoriesPopup isOpen={isOpenPopup} onClose={closePopup} />
        </>
    );
};

export default Categories;