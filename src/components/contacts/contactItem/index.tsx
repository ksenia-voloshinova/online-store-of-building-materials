
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/navigation";

import React, { FC, useState } from "react";
import SwiperCore, {  FreeMode,Navigation,Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Arrow from "@/assets/icons/arrow_sm.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import EmailIcon from "@/assets/icons/email.svg";
import NavigationIcon from "@/assets/icons/navitagion.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import Picture from "@/shared/picture";
import { IContactsInfoItem } from "@/types/contacts";
SwiperCore.use([Navigation, FreeMode, Thumbs, Pagination]);

const ThumsPostionClasses = "absolute top-[50%] z-10 rounded-[50%]";
const ThumbsClassNames = `${ThumsPostionClasses} w-[32px] h-[32px] absolute bg-white flex items-center justify-center`;
const ThumsArrowsClasses = "fill-cyanBlueDark hover:fill-black cursor-pointer duration-[300ms]";

type ContactItemPops = {
    item: IContactsInfoItem
    onChangeItem: (item: IContactsInfoItem) => void; 
}
const ContactItem:FC<ContactItemPops> = ({ item, onChangeItem }) => {
    return (
        <div className='w-full'>
            <div 
                className="text-[22px] font-bold cursor-pointer" 
                onClick={() => item.coords && onChangeItem(item)}>
                {item.name}
            </div>
            <div className="w-full flex flex-wrap gap-[27px] smMax:flex-col">
                <ul className='mt-[25px] flex-1 max-w-[270px] mdMax:max-w-[100%] '>
                    {item.address ? <li className='flex gap-[17px] mb-[15px] last:mb-[0px] '>
                        <div className=' flex gap-[17px]'>
                            <div className='w-[20px]'>
                                <NavigationIcon/>
                            </div>
                            <div className=" text-[16px] font-normal leading-[22px]">
                                {item.address}
                            </div>
                        </div>                           
                    </li> : null}
                    {item.phone ?   <li className='flex gap-[17px] mb-[15px] last:mb-[0px] '>
                        <div className=' flex gap-[17px]'>
                            <div className='w-[20px]'>
                                <PhoneIcon/>
                            </div>
                            <a className="text-[16px] font-normal leading-[22px]" href={`tel:${item.phone.link}`}>
                                {item.phone.text}
                            </a>
                        </div>                           
                    </li> : null}
                    {item.time ? <li className='flex gap-[17px] mb-[15px] last:mb-[0px] '>
                        <div className='w-[365px] flex gap-[17px]'>
                            <div className='w-[20px]'>
                                <ClockIcon/>
                            </div>
                            <div className="text-[16px] font-normal leading-[22px]">
                                {item.time}
                            </div>
                        </div>                           
                    </li> : null}
                    {item.email ?   <li className='flex gap-[17px] mb-[15px] last:mb-[0px] '>
                        <a className=' flex gap-[17px]' href={item.email.link}>
                            <div className='w-[20px]'>
                                <EmailIcon/>
                            </div>
                            <div className="text-[16px] font-normal leading-[22px]">
                                {item.email.text}
                            </div>
                        </a>                           
                    </li> : null}
                    {item.coords && !item.photo?.length  && 
                        <li 
                            className='sm:hidden block font-bold leading-[140%] text-cyanBlueGray mt-[13px] ' 
                            onClick={() => item.coords && onChangeItem(item)}>
                            Показать на карте -&gt;                
                        </li>
                    }
                
                </ul>
                <div 
                    className='
                    relative min-w-[0px] 
                    flex-[1_1_0px] 
                    max-w-[323px] 
                    lg:max-w-[370px] 
                    smMax:w-[100%] 
                    smMax:max-w-[100%]
                    '
                >
                    {item.photo ?  <Swiper
                        loop
                        className='my-swiper'
                        slidesPerView={1}
                        spaceBetween={50}
                        navigation={{
                            prevEl: ".thumbs-prev",
                            nextEl: ".thumbs-next",
                        }}
              
                    >
                        <button
                            className={`thumbs-prev ${ThumbsClassNames} rotate-90 left-[10px] opacity-65`}
                        >
                            <Arrow className={ThumsArrowsClasses} />
                        </button>
                        {item.photo.map(el => 
                            <SwiperSlide key={el}>
                                <div className='w-[370px] h-[267px] rounded-[8px]'>
                                    <Picture 
                                        alt='' 
                                        objectFit='contain' 
                                        plugHeight={200} 
                                        plugWidth={200}
                                        rounded='8px' 
                                        src={el}
                                    />
                                </div>
                            </SwiperSlide>
                        )}
                        <button
                            className={`thumbs-next ${ThumbsClassNames} right-[10px] opacity-65`}
                        >
                            <Arrow 
                                className={`${ThumsArrowsClasses} -rotate-90 `} 
                            />
                        </button>
                    </Swiper> : null}
                    {item.coords && item.photo?.length &&
                        <li 
                            className='sm:hidden block font-bold leading-[140%] text-cyanBlueGray mt-[13px] ' 
                            onClick={() => item.coords && onChangeItem(item)}>
                            Показать на карте -&gt;                
                        </li>
                    }
                </div>
            </div>

        </div>
    );
};

export default ContactItem;