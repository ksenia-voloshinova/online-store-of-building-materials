import { forwardRef, ReactNode } from "react";

interface ICustomInput {
    value?: ReactNode;
    onClick?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, ICustomInput>(({ value, onClick }, ref) => {
    return (
        <div className={"flex gap-[16px]"}>
            <p className={"font-bold text-xs"}>{value}</p>
            <button ref={ref} className={"text-xs text-yellowWarm font-bold"} type={"button"} onClick={onClick}>
                Выбрать дату доставки
            </button>
        </div>
    );
});

export default CustomInput;
