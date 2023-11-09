import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import useProductDetailData from "@/hooks/api/useProductDetailData";
import Interceptor from "@/shared/interceptor";
import Picture from "@/shared/picture";

SwiperCore.use([Navigation]);

const Sku: FC = () => {
    const router = useRouter();
    const { isLoading, isFetching, isError, data } = useProductDetailData();
    
    async function handleLink(isDisabled: boolean, link: string) {
        if (isDisabled) return;
        
        await router.push(link);
    }

    function renderPhotos() {
        return data?.sku?.map(sku => {
            const { id, image, link, slug, isDisabled, isChecked } = sku;
            
            return (
                <SwiperSlide key={id} className={"relative !w-[77px] !h-[77px] xl:!w-[114px] xl:!h-[114px]"}>
                    <li className={"h-full"}>
                        <a className={"block h-full w-full"} onClick={() => handleLink(isDisabled, link)}>
                            <div className={`p-[3px] flex items-center justify-center h-full border-1 
                        cursor-pointer ${isChecked ? "border-red" : "border-[transparent]"} 
                        ${isDisabled && "opacity-40 cursor-default"}`}
                            >
                                <Picture alt={slug} plugHeight={40} plugWidth={40} src={image} />
                            </div>
                        </a>
                    </li>
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
            <div className={"relative flex flex-col gap-[12px] w-full lg:w-max"}>
                <p className={"text-sm lg:text-lg-light"}>Выберите цвет</p>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={5}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                        1440: {
                            slidesPerView: 4,
                        }
                    }}
                    className="sku-swiper !mx-[-20px] !px-[20px] lg:!mx-[0px] lg:!px-[0px] lg:!w-[240px] 
                    xl:!w-[355px] 2xl:!w-[465px]"
                    navigation={{
                        prevEl: ".prev",
                        nextEl: ".next",
                    }}
                >
                    <div className={"flex flex-col gap-[12px] w-[465px]"}>
                        <p className={"text-black text-[18px] tracking-[-0.02em]"}>Выберите цвет</p>
                        <ul className={"flex gap-[10px]"}>
                            {renderPhotos()}
                        </ul>
                    </div>
                </Swiper>
                <button
                    className={"hidden prev rotate-90 lg:block absolute left-[-30px] top-[52%]"}
                >
                    <Arrow className={"fill-cyanBlueDark hover:fill-black cursor-pointer duration-[300ms]"} />
                </button>
                <button
                    className={"hidden next rotate-[-90deg] lg:block absolute right-[-30px] top-[52%]"}
                >
                    <Arrow className={"fill-cyanBlueDark hover:fill-black cursor-pointer duration-[300ms]"} />
                </button>
            </div>
        </Interceptor>
    );
};

export default Sku;