import { FC, ReactNode } from "react";

import DefaultButton from "@/shared/UI/buttons/defaultButton";

interface IButtonContainer {
    onClick: () => void;
    isActive: boolean;
    children: ReactNode;
}

const ButtonContainer: FC<IButtonContainer> = ({ isActive, onClick, children }) => {
    return (
        <DefaultButton
            styles={`!p-[15px] !w-[50px]
            ${isActive 
            ? "!bg-yellowWarm group-hover:!bg-blueMagentaDark" 
            : "!bg-white !border-1 !border-cyanBlueLight"}
                `}
            onClick={onClick}
        >
            {children}
        </DefaultButton>
    );
};

export default ButtonContainer;
