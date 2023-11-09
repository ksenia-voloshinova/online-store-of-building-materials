import { useRouter } from "next/router";
import { FC } from "react";

import useHover from "@/hooks/useHover";
import Picture from "@/shared/picture";
import Actions from "@/shared/productCard/actions";
import Price from "@/shared/productCard/productCardPlate/Price";
import Rating from "@/shared/productCard/productCardPlate/Rating";
import { IProductCatalog } from "@/types/catalog";

interface IProductCard {
    productData: IProductCatalog;
    onClick?: () => void;
}

const ProductCardPlate: FC<IProductCard> = ({ productData, onClick }) => {
    const router = useRouter();
    const { name, basePrice, image, isSale, link, salePrice, rate, isSalable } = productData;
    const { eventHandlers, isHover } = useHover();

    async function handleProduct(e: any) {
        e.preventDefault();

        if (onClick) onClick();

        await router.push(link);
    }

    return (
        <div
            className={"group flex flex-col w-full sm:max-w-[328px] md:max-w-[480px] lg:max-w-[480px]"}
            {...eventHandlers}
        >
            <a
                className={"block relative w-full h-[254px]"}
                href={link}
                onClick={handleProduct}
            >
                <Picture alt={name} src={image} />
            </a>
            <div className={"px-[35px] py-[17px] flex flex-col justify-between gap-[46px] " +
                    "bg-cyanBlueLight group-hover:bg-yellowWarm duration-[400ms]"}
            >
                <a
                    href={link}
                    className={"block line-clamp-3 h-[60px] text-sm lg:text-[16px] text-blueMagentaDark " +
                            "font-bold duration-[400ms]"}
                    onClick={handleProduct}
                >
                    {name}
                </a>
                <div className={"flex flex-col gap-[15px]"}>
                    <div className={"flex justify-between items-center"}>
                        <Price basePrice={basePrice} isSalable={isSalable} isSale={isSale} salePrice={salePrice} />
                        <Rating isHover={isHover} rate={rate} />
                    </div>
                    <Actions product={productData} />
                </div>
            </div>
        </div>
    );
};

export default ProductCardPlate;
