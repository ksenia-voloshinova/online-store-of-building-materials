import Link from "next/link";
import { FC, ReactNode } from "react";

import Picture from "@/shared/picture";
import ProductConverter from "@/shared/productConverter";
import Rate from "@/shared/rate";
import { IProduct, IProductConverter } from "@/types";

interface IProductCardCounter {
    product: IProduct | IProductConverter;
    deleteOnZero?: boolean;
    isDisabled?: boolean;
    children?: ReactNode;
    containerStyle?: string;
}

const ProductCardCounter: FC<IProductCardCounter> = ({
    product,
    deleteOnZero = false,
    isDisabled= false,
    children,
    containerStyle = ""
}) => {
    const { name, link, image, article, rate, fullPrice } = product;

    return (
        <div className={"py-[24px] flex flex-col md:flex-row items-start justify-between gap-[15px]"}
        >
            <Link href={link ?? "#"}>
                <a className={"flex gap-[24px] md:w-1/2"}>
                    <div className={"relative min-w-[73px] h-[73px]"}>
                        <Picture alt={name} plugHeight={73} plugWidth={73} src={image} />
                    </div>
                    <div className={"flex flex-col justify-between"}>
                        <p className={"font-bold"}>{name}</p>
                        <div className={"flex flex-wrap items-center gap-x-[16px]"}>
                            <p className={"text-sm"}>Артикул: {article}</p>
                            <div className={"flex items-center gap-[8px]"}>
                                <Rate rate={rate} spacing={1} />
                                <p className={"text-sm"}>{rate}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <div className={`flex flex-wrap justify-around items-center gap-[24px] w-full ${containerStyle}`}>
                {children ?? (
                    <ProductConverter
                        currentCount={product.count}
                        deleteOnZero={deleteOnZero}
                        fullPrice={fullPrice}
                        isDisabled={isDisabled}
                        product={product}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCardCounter;
