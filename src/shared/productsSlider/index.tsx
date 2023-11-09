import "swiper/css";

import { FC, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Characteristics from "@/shared/characteristics";
import ProductCard from "@/shared/productCard/productCardPlate";
import ArrowLg from "@/shared/UI/buttons/arrowLg";
import { IProductCatalog } from "@/types/catalog";
import { ICompareProduct } from "@/types/compare";

type TProductData = IProductCatalog[] | ICompareProduct[];

interface IProductsSlider {
    data: TProductData;
    title: string;
    onSlideChange?: (index: number) => void;
}

const defaultBreakpoints: {
    [width: number]: {
        slidesPerView: number;
        spaceBetween: number;
    }
} = {
    768: {
        slidesPerView: 2,
        spaceBetween: 17,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
    1280: {
        slidesPerView: 4,
        spaceBetween: 25,
    },
    1600: {
        slidesPerView: 5,
        spaceBetween: 25,
    }
};

const ProductsSlider: FC<IProductsSlider> = ({
    data,
    title,
    onSlideChange,
}) => {
    const [swiper, setSwiper] = useState<any>(null);

    function onSlide(swiper: any) {
        if (!onSlideChange) return;

        onSlideChange(swiper.activeIndex);
    }

    function renderProducts() {
        return data?.map(product => {
            return (
                <SwiperSlide key={product.id} className={"mdMax:!w-[280px]"} id={product.id.toString()}>
                    <ProductCard productData={product} />
                    {"characteristics" in product && (
                        <ul className={"mt-[25px] flex flex-col gap-[10px]"}>
                            <Characteristics data={product.characteristics} />
                        </ul>
                    )}
                </SwiperSlide>
            );
        });
    }

    return (
        <div className={"relative"}>
            <p className={"mb-[14px] text-[18px] lg:text-[28px] font-bold"}>{title}</p>
            <Swiper
                breakpoints={defaultBreakpoints}
                className={"viewed-swiper mdMax:!mx-[-20px] mdMax:!px-[20px]"}
                modules={[Navigation]}
                slidesPerView={"auto"}
                spaceBetween={10}
                watchSlidesProgress={true}
                navigation={{
                    prevEl: ".viewed-prev",
                    nextEl: ".viewed-next"
                }}
                onSlideChange={onSlide}
                onSwiper={setSwiper}
            >
                {renderProducts()}
                <ArrowLg
                    arrowStyle={"stroke-white"}
                    buttonStyle={"viewed-prev hidden lg:block absolute left-[10px] top-[80px] z-[100]"}
                />
                <ArrowLg
                    arrowStyle={"stroke-white"}
                    buttonStyle={"viewed-next hidden lg:block absolute right-[10px] top-[80px] z-[100] " +
                        "rotate-180"}
                />
            </Swiper>
        </div>
    );
};

export default ProductsSlider;
