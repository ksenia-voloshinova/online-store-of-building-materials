import { FC } from "react";

import Categories from "@/shared/UI/popups/categoriesPopup/Categories";
import Partners from "@/shared/UI/popups/categoriesPopup/Partners";
import FullScreenPopup from "@/shared/UI/popups/fullScreenPopup";
import { IPopup } from "@/shared/UI/popups/types";

const CategoriesPopup: FC<IPopup> = ({ isOpen, onClose }) => {
    return (
        <FullScreenPopup isOpen={isOpen} onClose={onClose}>
            <div className={"flex flex-col md:grid md:grid-cols-[1fr,_250px] lg:grid-cols-[1fr,_313px] " +
                "justify-between h-full"}
            >
                <Categories onClose={onClose} />
                <Partners />
            </div>
        </FullScreenPopup>
    );
};

export default CategoriesPopup;