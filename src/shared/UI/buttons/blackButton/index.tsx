import { FC } from "react";

import { IButton } from "@/shared/UI/buttons/types";

const BlackButton: FC<IButton> = ({
    children,
    isDisabled= false,
    type= "submit",
    onClick
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={"py-[20px] px-[30px] w-full text-sm text-white " +
                "bg-blueMagentaDark border-1 border-[transparent] " +
                "duration-[400ms] hover:bg-[transparent] hover:border-1 " +
                "hover:border-blueMagentaDark hover:text-blueMagentaDark"}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default BlackButton;