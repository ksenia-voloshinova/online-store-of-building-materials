import { FC } from "react";

import Minus from "@/assets/icons/minus.svg";
import Plus from "@/assets/icons/plus.svg";
import Cart from "@/assets/icons/shopping-cart.svg";
import DefaultButton from "@/shared/UI/buttons/defaultButton";

interface ICounterButton {
    id?: number;
    count: number;
    isDisabled?: boolean;
    deleteOnZero?: boolean;
    addProduct?: () => void;
    deleteProduct?: () => void;
    isSalable?: boolean;
}

const CounterButton: FC<ICounterButton> = ({
    count,
    isDisabled = false,
    deleteOnZero= true,
    addProduct,
    deleteProduct,
    isSalable= true
}) => {
    const isDisabledDec = isDisabled || (!deleteOnZero && count === 1);

    return (
        <div className={"w-[135px] h-[44px]"}>
            {count ? (
                <div className={"p-[6px] flex justify-center items-center gap-[10px] w-full " +
                    "h-full bg-white border-1 border-cyanBlueMiddle rounded"}
                >
                    <button className={"w-[20px] h-[15px]"} disabled={isDisabledDec} onClick={deleteProduct}>
                        <Minus className={`${isDisabledDec ? "fill-cyanBlueMiddle" : "fill-cyanBlueGray"}`} />
                    </button>
                    <div className={"min-w-[20px] max-w-[60px] w-max text-center font-bold"}>{count}</div>
                    <button className={"w-[20px] h-[15px]"} disabled={isDisabled} onClick={addProduct}>
                        <Plus className={`${isDisabled ? "fill-cyanBlueMiddle" : "fill-cyanBlueGray"}`} />
                    </button>
                </div>
            ) : (
                <>
                    {isSalable && (
                        <DefaultButton
                            styles={"!p-[12px] !w-full !h-full group-hover:!bg-blueMagentaDark group-hover:!text-white"}
                            onClick={addProduct}
                        >
                            <Cart className={"fill-black group-hover:fill-white duration-[400ms]"} />
                            В корзину
                        </DefaultButton>
                    )}
                </>
            )}
        </div>
    );
};

export default CounterButton;
