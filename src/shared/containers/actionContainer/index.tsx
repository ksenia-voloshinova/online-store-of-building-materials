import { FC, ReactNode } from "react";

interface IActionContainer {
    children: ReactNode;
    value: number;
}

const ActionContainer: FC<IActionContainer> = ({ children, value }) => {
    return (
        <div className={"relative"}>
            {!!value && (
                <div className={"absolute top-[-10px] right-[-10px] flex justify-center " +
                    "items-center w-[20px] h-[20px] bg-yellowWarm text-white rounded-[50%] " +
                    "text-xs text-sm font-bold"}
                >
                    {value > 9 ? "9+" : value}
                </div>
            )}
            {children}
        </div>
    );
};

export default ActionContainer;
