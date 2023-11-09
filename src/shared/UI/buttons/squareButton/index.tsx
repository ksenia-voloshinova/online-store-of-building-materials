import { FC } from "react";

import { IButton } from "@/shared/UI/buttons/types";

const SquareButton: FC<IButton> = ({
    children,
    isDisabled= false,
    type= "submit",
    onClick,
    styles= ""
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={`md:min-w-[242px] px-[24px] py-[5px] 
                        md:px-[30px] md:py-[10px] text-cyanBlueCool border-1 border-blueMagenta bg-white 
                        hover:bg-whiteWarm duration-[300ms] print:hidden ${styles}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default SquareButton;
