import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import useProductDetailData from "@/hooks/api/useProductDetailData";
import useWindowSize from "@/hooks/useWindowSize";
import Interceptor from "@/shared/interceptor";
import Picture from "@/shared/picture";
import ArrowLg from "@/shared/UI/buttons/arrowLg";
import Zoom from "@/shared/zoom";

SwiperCore.use([Navigation, FreeMode, Thumbs, Pagination]);

const Photos: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { width } = useWindowSize();
    const [photoSize, setPhotoSize] = useState<number>(710);
    
    useEffect(() => {
        if (!width) return;
        
        if (width < 1024) {
            setPhotoSize(604);
        } else if (width >= 1024 && width < 1440) {
            setPhotoSize(584);
        } else if (width >= 1440) {
            setPhotoSize(710);
        }
    }, [width]);
    
    function renderPhotos() {
        return data?.photos?.map(photo => {
            const { id, image } = photo;
            
            return (
                <SwiperSlide key={id} className={"p-[2px] " +
                    "!h-full border-1 border-[transparent]"}
                >
                    <div className={"relative md:hidden h-[350px] sm:h-[450px] max-w-[604px]"}>
                        <Picture alt={data?.title} src={image} />
                    </div>
                    <div className={"hidden md:block w-full h-full"}>
                        {image ? (
                            <Zoom
                                height={photoSize}
                                img={image}
                                scale={2}
                                width={photoSize}
                            />
                        ) : (
                            <Picture alt={data?.title} src={image} />
                        )}
                    </div>
                </SwiperSlide>
            );
        });
    }
    
    function renderPhotoThumbnail() {
        return data?.photos?.map(photo => {
            const { id, image } = photo;

            return (
                <SwiperSlide key={id} className={"flex justify-center items-center"}>
                    <div className={"relative p-[2px] w-[77px] h-[77px]"}
                    >
                        <Picture alt={data?.title} plugHeight={40} plugWidth={40} src={image} />
                    </div>
                </SwiperSlide>
            );
        });
    }
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить изображения товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <div className={"flex gap-[10px] justify-center lg:justify-start"}>
                <div className={"hidden md:flex flex-col items-center gap-[17px]"}>
                    <button
                        className={"thumbs-prev rotate-180"}
                    >
                        <Arrow className={"fill-cyanBlueDark hover:fill-black cursor-pointer duration-[300ms]"} />
                    </button>
                    <Swiper
                        className="detail-thumbs-swiper !w-[82px] !h-[435px]"
                        direction={"vertical"}
                        slidesPerView={5}
                        spaceBetween={5}
                        watchSlidesProgress={true}
                        navigation={{
                            prevEl: ".thumbs-prev",
                            nextEl: ".thumbs-next",
                        }}
                        onSwiper={setThumbsSwiper}
                    >
                        {renderPhotoThumbnail()}
                    </Swiper>
                    <button
                        className={"thumbs-next"}
                    >
                        <Arrow className={"fill-cyanBlueDark hover:fill-black cursor-pointer duration-[300ms]"} />
                    </button>
                </div>
                <Swiper
                    className="detail-swiper !pb-[20px] md:!pb-[0px] !m-[0px] !w-[604px] lg:!w-[584px] 2xl:!w-[710px]"
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        768: {
                            pagination: false,
                        }
                    }}
                    navigation={{
                        prevEl: ".photo-prev",
                        nextEl: ".photo-next"
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper?.destroyed 
                        ? thumbsSwiper 
                        : null 
                    }}
                >
                    {renderPhotos()}
                    <ArrowLg 
                        arrowStyle={"stroke-white"} 
                        buttonStyle={"photo-prev hidden md:block absolute left-[10px] top-[45%] z-[100]"}
                    />
                    <ArrowLg
                        arrowStyle={"stroke-white"}
                        buttonStyle={"photo-next hidden md:block absolute right-[10px] top-[45%] z-[100] " +
                            "rotate-180"}
                    />
                </Swiper>
            </div>
        </Interceptor>
    );
};

export default Photos;