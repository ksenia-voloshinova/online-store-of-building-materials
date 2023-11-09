import { FC, RefObject, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Picture from "@/shared/picture";
import Actions from "@/shared/productCard/actions";
import Rate from "@/shared/rate";
import { getCompareActiveGroupProducts } from "@/store/selectors/compareSelector";
import { useAppSelector } from "@/store/store";
import { RUB } from "@/utils/constants";

interface IVisibleProducts {
    activeIndex: number;
    activeGroupId: number;
    productsRef: RefObject<HTMLUListElement>;
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

const VisibleProducts: FC<IVisibleProducts> = ({ activeIndex, activeGroupId, productsRef }) => {
    const products = useAppSelector((state) =>getCompareActiveGroupProducts(state, activeGroupId));
    const [swiper, setSwiper] = useState<any>(null);
    const [isActivePopup, setIsActivePopup] = useState<boolean>(false);

    useEffect(() => {
        if (!swiper) return;

        swiper.slideTo(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    function onScroll() {
        const top = productsRef?.current?.getBoundingClientRect().top ?? 0;

        if (top < -140) {
            setIsActivePopup(true);
        } else {
            setIsActivePopup(false);
        }
    }

    function renderVisibleProducts() {
        return products?.map(slide => {
            const { id, elementId, image, name, basePrice, isSale, salePrice, rate } = slide;

            return (
                <SwiperSlide key={id} className={"flex flex-col gap-[16px] mdMax:!w-[280px] w-full"}>
                    <div className={"flex gap-[16px]"}>
                        <div className={"relative min-w-[73px] h-[73px]"}>
                            <Picture alt={name} plugHeight={73} plugWidth={73} src={image} />
                        </div>
                        <p className={"text-sm"}>{name}</p>
                    </div>
                    <div className={"flex flex-wrap justify-between"}>
                        <p className={"font-bold text-[20px] md:text-[22px]"}>{isSale ? salePrice : basePrice} {RUB}</p>
                        <Rate rate={rate} />
                    </div>
                    <Actions product={slide} />
                </SwiperSlide>
            );
        });
    }

    return (
        <div
            className={`py-[16px] ${isActivePopup ? "block" : "hidden"} container container-width fixed z-[100] 
                top-[72px] md:top-[138px] 2xl:top-[148px]
                left-[0px] right-[0px] w-full bg-white duration-[300ms]
                 shadow-[0px_8px_8px_rgba(33,37,41,0.24),_0px_2px_4px_rgba(33,37,41,0.24)]`}
        >
            <Swiper
                allowTouchMove={false}
                breakpoints={defaultBreakpoints}
                className={"compare-swiper mdMax:!mx-[-20px] mdMax:!px-[20px]"}
                slidesPerView={"auto"}
                spaceBetween={20}
                watchSlidesProgress={true}
                onSwiper={setSwiper}
            >
                {renderVisibleProducts()}
            </Swiper>
        </div>
    );
};

export default VisibleProducts;
