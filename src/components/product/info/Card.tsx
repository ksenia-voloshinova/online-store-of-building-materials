import { FC, useEffect, useState } from "react";

import CharacteristicsInfo from "@/components/product/info/CharacteristscsInfo";
import Price from "@/components/product/info/Price";
import Sku from "@/components/product/info/Sku";
import Top from "@/components/product/info/Top";
import useProductDetailData from "@/hooks/api/useProductDetailData";
import Interceptor from "@/shared/interceptor";
import BasketProductConverter from "@/shared/productConverter/BasketProductConverter";
import { IProductConverter } from "@/types";

const Card: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();
    const [newProduct, setNewProduct] = useState<IProductConverter | null>(null);
    const basePrice = data?.isSale ? data?.salePrice : data?.basePrice;

    useEffect(() => {
        if (!data) return;

        const { id, title, rate, count, measureCode, measureName, converters, isSalable } = data;

        setNewProduct({
            id,
            rate,
            count,
            measureName,
            measureCode,
            converters,
            name: title,
            isSalable,
            image: "",
            link: "",
            article: "",
            basePrice: basePrice ?? 0,
            fullPrice: (basePrice ?? 0) * data?.count ?? 0,
        });
    }, [data]);

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить карточку товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <div className={"flex flex-col-reverse lg:flex-col justify-between gap-[10px] w-full"}>
                <div>
                    <div className={"hidden lg:block"}>
                        <Top />
                    </div>
                    <div className={"hidden lg:block"}>
                        <Price basePrice={basePrice ?? 0} isSalable={data?.isSalable ?? false} />
                    </div>
                    <CharacteristicsInfo />
                </div>
                <div className={"flex flex-col gap-[10px]"}>
                    <div className={"lg:hidden"}>
                        <Price basePrice={basePrice ?? 0} isSalable={data?.isSalable ?? false} />
                    </div>
                    {newProduct && (
                        <div className={"mt-[20px] lg:mt-[0px] flex flex-wrap justify-center md:justify-start " +
                            "lg:justify-center items-center gap-[24px]"}
                        >
                            <BasketProductConverter deleteOnZero={true} product={newProduct} />
                        </div>
                    )}
                </div>
                <Sku />
            </div>
        </Interceptor>
    );
};

export default Card;
