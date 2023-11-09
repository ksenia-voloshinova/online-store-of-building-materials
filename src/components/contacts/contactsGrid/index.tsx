import React, { useEffect, useRef, useState } from "react";

import NavigationIcon from "@/assets/icons/navitagion.svg";
import useCompareProducts from "@/hooks/api/useCompareProducts";
import useContactsInfo from "@/hooks/api/useContactsInfo";
import useWindowSize from "@/hooks/useWindowSize";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import YandexMap from "@/shared/yandexMap";
import { IPlacemark } from "@/shared/yandexMap/types";
import { IContactsInfoItem } from "@/types/contacts";

import ContactItem from "../contactItem";

interface IPlaceMarkWithName extends IPlacemark {
 name: string
}


const ContactsGrid = () => {
    const { data, isError,isFetching, isLoading  } = useContactsInfo();    

    const [points, setPoints] = useState<IPlaceMarkWithName[]>([]);
    const [center, setcenter] = useState<number[] | null>(null);

    const { width } = useWindowSize();
    const [mapSize, setMapSize] = useState({
        width: "300px",
        height: "300px",
    });

    useEffect(() => {
        if (!width) return;

        if (width < 768) {
            setMapSize({
                width: "100%",
                height: "400px"
            });
        } else {
            setMapSize({
                width: "600px",
                height: "600px"
            });
        }
    }, [width]);
    useEffect(() => {
        
        if(data){
            const points = data.items?.filter(el => el.coords !== undefined).map(el => {
                return (
                    {
                        coords: {
                            ...el.coords
                        },
                        name: el.name
                    }
                );
            }) as unknown as IPlaceMarkWithName[];

            setPoints(points);
        }
    }, [data]);
    
    const handleChangeContactItem = (item:IContactsInfoItem) => {
        const newPoints = points.map(el => {
            return {
                ...el,
                isActive: el.name === item?.name ? true : false
            };

        }) as IPlaceMarkWithName[];

        if(item?.coords){
            setcenter([item.coords.latitude, item.coords.longitude]);
            if(width && width <=768){
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
    
            setPoints(newPoints);
        }

    };
    
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить типы доставки"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <div
                className='
                    grid 
                    gap-[21px] 
                    grid-cols-2 
                    mdMax:flex
                    mdMax:flex-col-reverse 
                    scroll-my-1
                '
            >
                <div className='flex gap-[11px] flex-col'>
                    {data && data.items?.map(item => 
                        <ContactItem key={item.id} item={item} onChangeItem={handleChangeContactItem}/>
                    )}
                </div>
                <YandexMap
                    grayMode
                    center={center ? center : points && [points[0]?.coords.latitude, points[0]?.coords.longitude]} 
                    containterClassNames='w-[100%] h-[545px] mdMax:w-[100%] mdMax:h-[300px]' 
                    defaultPlaceMark={false} 
                    height={mapSize.height}
                    placemarks={points}
                    width={mapSize.width}
                    renderPoint={(item) => 
                        <div className={`ymap-custom-marker ${item.isActive ? "ymap-custom-marker-active" : ""}`}>
                            <NavigationIcon/>
                            <span>{item.name}</span>
                        </div>
                    }
                />
            </div>
        </Interceptor>

    );
};

export default ContactsGrid;