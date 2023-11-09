import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

import { IProductCatalog } from "@/types/catalog";
import { RUB } from "@/utils/constants";

interface IProductCard {
    productData: IProductCatalog;
    onClick?: () => void;
}

const ProductCardList: FC<IProductCard> = ({ productData, onClick }) => {
    const router = useRouter();
    const { id, name, basePrice, image, isSale, link, salePrice, rate } = productData;

    async function handleProduct(e: any) {
        e.preventDefault();

        if (onClick) onClick();

        await router.push(link);
    }

    return (
        <a href={link} onClick={handleProduct}>
            <Image
                alt={"product"}
                height={254}
                objectFit={"cover"}
                src={image}
                width={328}
            />
            {name}
            {isSale ? salePrice : basePrice} {RUB}
            {rate}
        </a>
    );
};

export default ProductCardList;
