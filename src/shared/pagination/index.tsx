import React, { FC } from "react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import getArrayFromNumber from "@/utils/getArrayFromNumber";

interface IPagination {
    currentPage: number;
    pages: number;
    onClick?: (page: number) => void;
}

const Pagination: FC<IPagination> = ({ currentPage, pages, onClick }) => {
    const arrowStyle = "cursor-pointer fill-cyanBlueGray hover:fill-yellowWarm duration-[300ms]";

    async function handlePage(currentPage: number) {
        window.scrollTo(0, 0);

        if (onClick) onClick(currentPage);
    }

    function renderPages() {
        return getArrayFromNumber(pages).map(pageItem => {
            return (
                <li key={pageItem}>
                    <button
                        className={`text-[14px] font-bold ${+currentPage === pageItem && "text-yellowWarm"}`}
                        onClick={() => handlePage(pageItem)}
                    >
                        {pageItem}
                    </button>
                </li>
            );
        });
    }

    return (
        <div className={"flex gap-[8px] items-center print:hidden"}>
            <button
                disabled={+currentPage - 1 === 0}
                onClick={() => handlePage(+currentPage - 1)}
            >
                <Arrow
                    className={`rotate-90 ${arrowStyle} 
                    ${+currentPage - 1 === 0 && "fill-cyanBlueMiddle hover:fill-cyanBlueMiddle"}`}
                />
            </button>
            <ul className={"flex gap-[8px]"}>
                {renderPages()}
            </ul>
            <button
                disabled={+currentPage + 1 > pages}
                onClick={() => handlePage(+currentPage + 1)}
            >
                <Arrow
                    className={`rotate-[-90deg] ${arrowStyle}
                    ${+currentPage + 1 > pages && "fill-cyanBlueMiddle hover:fill-cyanBlueMiddle"}`}
                />
            </button>
        </div>
    );
};

export default Pagination;
