import { FC, ReactNode } from "react";

import CounterButton from "@/shared/UI/buttons/counterButton";
import DefaultSwitcher from "@/shared/UI/switcher/defaultSwitcher";
import { IProduct, IProductConverter } from "@/types";
import { RUB } from "@/utils/constants";

interface IProductConverterProps {
    children?: ReactNode;
    product: IProductConverter | IProduct;
    isDisabled?: boolean;
    deleteOnZero?: boolean;
    fullPrice?: number;
    currentCount?: number;
    currentBasePrice?: number;
    add?: () => void;
    remove?: () => void;
    removeTotal?: () => void;
    onChange?: (id: string) => void;
}

const ProductConverter: FC<IProductConverterProps> = ({
    children,
    product,
    deleteOnZero= false,
    isDisabled = false,
    currentCount= 0,
    currentBasePrice,
    fullPrice,
    add,
    remove,
    removeTotal,
    onChange
}) => {
    const converters = "converters" in product ? product.converters : [];
    const switchers = [
        ...converters,
        {
            code: product.measureCode,
            name: product.measureName,
        }
    ];

    return (
        <>
            <div className={`${(product.isSalable || product.basePrice) ? "opacity-1" : "opacity-0"} 
            flex flex-col md:flex-row items-center gap-[8px] md:min-w-[280px]`}
            >
                <p>Цена за:</p>
                <div className={"flex items-center gap-[8px]"}>
                    <DefaultSwitcher
                        defaultValue={product.measureCode}
                        switchers={switchers}
                        onClick={onChange}
                    />
                    <p>{currentBasePrice ?? (product.basePrice ?? "-")} {RUB}</p>
                </div>
            </div>
            {children ?? (
                <>
                    <CounterButton
                        addProduct={add}
                        count={currentCount}
                        deleteOnZero={deleteOnZero}
                        deleteProduct={remove}
                        id={product.id}
                        isDisabled={isDisabled}
                        isSalable={product.isSalable}
                    />
                    {!!currentCount && (
                        <div className={"flex flex-col items-center gap-[8px] w-full sm:w-max"}>
                            {product.isSalable && (
                                <div className={"text-[22px] font-bold self-end"}>
                                    {(fullPrice ?? product.fullPrice).toFixed(2)} {RUB}
                                </div>
                            )}
                            {!!removeTotal && (
                                <button
                                    className={"p-[9px] self-end w-[137px] bg-blackLight text-white uppercase rounded"}
                                    onClick={removeTotal}
                                >
                                    Удалить
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ProductConverter;
