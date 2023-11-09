import { FC, ReactNode } from "react";

interface ITitle {
    isActive: boolean;
    children: string | ReactNode;
    onClick: () => void;
}

const Title: FC<ITitle> = ({ isActive, onClick, children }) => {
    return (
        <button
            className={`text-sm md:text-[16px] ${isActive ? "text-yellowWarm" : "text-blueMagentaDark"}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Title;
