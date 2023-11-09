import "swiper/css";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Arrow from "@/assets/icons/arrow.svg";
import { IPromotion } from "@/types";

SwiperCore.use([Navigation]);

interface IPromotions {
    promotions: IPromotion[];
}

const Promotions: FC<IPromotions> = ({ promotions }) => {
    function renderPromotions() {
        return promotions?.map(promotion => {
            const { id, title, color, image, link, description } = promotion;
            
            return (
                <SwiperSlide key={id}>
                    <Link href={link ?? "#"}>
                        <a
                            style={{ backgroundColor: `${color}` }}
                            className={"relative flex justify-end " +
                                "h-[120px] sm:h-[150px] md:h-[180px]"}
                        >
                            <div className={"absolute w-1/2 top-[0px] left-[0px] " +
                                "md:w-[300px] h-[194px]"}
                            >
                                <Image
                                    alt={title}
                                    height={194}
                                    objectFit={"cover"}
                                    src={image}
                                    width={300}
                                />
                            </div>
                            <div className={"p-[5px] sm:p-[20px] 2xl:px-[60px] flex " +
                                "flex-col gap-[5px] md:gap-[10px] w-5/12 xl:w-1/2"}
                            >
                                <p 
                                    className={"text-xl sm:text-3xl"}
                                    dangerouslySetInnerHTML={{ __html: title ?? "" }} 
                                />
                                <p 
                                    className={"text-sm sm:text-xl"} 
                                    dangerouslySetInnerHTML={{ __html: description ?? "" }} 
                                />
                            </div>
                        </a>
                    </Link>
                </SwiperSlide>
            );
        });
    }
    
    return (
        <Swiper
            className="promotions-swiper"
            freeMode={true}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
                1200: {
                    slidesPerView: 2,
                }
            }}
            navigation={{
                prevEl: ".prev",
                nextEl: ".next",
            }}
        >
            {renderPromotions()}
            <button
                className={"prev hidden md:block absolute left-[10px] top-[28%] z-[100]"}
            >
                <Arrow className={"stroke-blueMagentaDark"} />
            </button>
            <button
                className={"next hidden md:block absolute right-[10px] top-[28%] z-[100] " +
                    "rotate-180"}
            >
                <Arrow className={"stroke-blueMagentaDark"} />
            </button>
        </Swiper>
    );
};

export default Promotions;