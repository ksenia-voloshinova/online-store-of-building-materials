import { FC } from "react";

import { IButton } from "@/shared/UI/buttons/types";

const DefaultButton: FC<IButton> = ({
    children,
    isDisabled= false,
    type= "submit",
    onClick,
    styles
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={`py-[16px] px-[24px] flex justify-center items-center gap-[4px] w-full md:w-max text-xs 
            lg:text-sm  
            ${isDisabled ? "text-yellowLight" : "text-black hover:bg-yellowWarmLight"}
            bg-yellowWarm duration-[400ms] rounded shadow-md uppercase ${styles}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default DefaultButton;
