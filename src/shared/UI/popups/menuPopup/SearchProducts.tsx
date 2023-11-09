import { FC } from "react";

import Search from "@/assets/icons/searchWhite.svg";

interface ISearchProducts {
    onOpen: () => void;
}

const SearchProducts: FC<ISearchProducts> = ({ onOpen }) => {
    return (
        <button onClick={onOpen}>
            <Search className={"fill-white " +
                "hover:text-yellowWarm"} />
        </button>
        
    );
};

export default SearchProducts;