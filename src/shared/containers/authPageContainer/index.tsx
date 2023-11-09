import { FC, ReactNode } from "react";

interface IPageFormContainer {
    children: ReactNode;
}

const PageFormContainer: FC<IPageFormContainer> = ({ children }) => {
    return (
        <div className={"container container-width flex justify-center items-center " +
            "h-[calc(100vh-65px)] md:h-[calc(100vh-138px)]"}
        >
            <div className={"p-[20px] md:p-[40px] w-full md:w-[600px] bg-white border-1 " +
                "border-whiteWarm rounded-[8px] shadow-lg"}
            >
                {children}
            </div>
        </div>
    );
};

export default PageFormContainer;