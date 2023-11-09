import { useState } from "react";

import { IConverter, IProduct, IProductConverter } from "@/types";

function useConverter(currentProduct: IProduct | IProductConverter) {
    const [currentCount, setCurrentCount] = useState<number>(currentProduct.count ?? 0);
    const [currentBasePrice, setCurrentBasePrice] = useState<number>(currentProduct.basePrice);
    const converters = "converters" in currentProduct ? currentProduct.converters : [];

    function getBaseCount(currentCount: number) {
        return +(Math.round(
            currentCount * (currentBasePrice / currentProduct.basePrice)
        ).toFixed(2));
    }

    function onChange(id: string) {
        const foundMeasure = converters.find(converter => converter.code === id);

        if (foundMeasure) {
            const count = +(Math.ceil(currentCount / foundMeasure.multiplier).toFixed(2));
            const basePrice = +((currentProduct.basePrice * foundMeasure.multiplier).toFixed(2));

            setCurrentBasePrice(basePrice);
            setCurrentCount(count);
        } else {
            const baseCount = getBaseCount(currentCount);

            setCurrentBasePrice(currentProduct.basePrice);
            setCurrentCount(baseCount);
        }
    }

    return {
        currentCount,
        setCurrentCount,
        currentBasePrice,
        setCurrentBasePrice,
        onChange,
        getBaseCount
    };
}

export default useConverter;
