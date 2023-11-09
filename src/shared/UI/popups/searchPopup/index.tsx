import { FC } from "react";

import Search from "@/shared/productSearch";
import TranslatePopup from "@/shared/UI/popups/translatePopup";
import { IPopup } from "@/shared/UI/popups/types";

const SearchPopup: FC<IPopup> = ({ isOpen, onClose }) => {
    return (
        <TranslatePopup isOpen={isOpen} onClose={onClose}>
            <Search />
        </TranslatePopup>
    );
};

export default SearchPopup;