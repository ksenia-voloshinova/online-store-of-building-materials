import React, { FC, useEffect, useRef, useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import { Map, Placemark, YMaps, YMapsApi, ZoomControl } from "react-yandex-maps";

import { IPlacemark, IYandexMap } from "@/shared/yandexMap/types";

const YandexMap:<T extends IPlacemark = IPlacemark>(props:IYandexMap<T>) => React.ReactElement = ({
    width= "600px",
    height= "600px",
    value,
    defaultCenter = [55.749451, 37.542824],
    center,
    onChange,
    isDisabled = false,
    defaultPlaceMark= true,
    placemarks = [],
    grayMode = false,
    containterClassNames = "",
    renderPoint,
    
}) => {
    const [mapState, setMapState] = useState({
        center: defaultCenter,
        data: [],
        zoom: 10,
    });

    const [mapConstructor, setMapConstructor] = useState<YMapsApi | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (onChange) onChange(mapState);
    }, [mapState]);

    useEffect(() => {
        if (mapConstructor && value) {
            mapConstructor.geocode(value).then((result: any) => {
                const nearest = result.geoObjects.get(0);
                const fullAddressData = nearest.properties
                    .get("metaDataProperty").GeocoderMetaData.Address.Components;
                const newCoords = result.geoObjects.get(0).geometry.getCoordinates();

                setMapState((prevState) => ({ ...prevState, center: newCoords, data: fullAddressData }));
            });
        }
        
    }, [mapConstructor, value]);

    function onClickToMap(e: any) {
        const newCoords = e.get("coords");

        mapConstructor?.geocode(newCoords).then((result: any) => {
            const nearest = result.geoObjects.get(0);
            const coords = nearest.geometry.getCoordinates();
            const fullAddressData = nearest.properties.get("metaDataProperty").GeocoderMetaData.Address.Components;

            setMapState((prevState) => ({ ...prevState, center: coords, data: fullAddressData }));
        });
    }
    const renderCustomPointItem = (jsx: React.ReactElement) => {
        const item = mapConstructor?.templateLayoutFactory.createClass(ReactDOMServer.renderToString(jsx));

        return item;
    };


    function renderPlacemarks() {
        return placemarks.map((placemark, index) => {
            const { coords, isActive } = placemark;
            let opt: Record<any, any> = { iconColor: `${isActive ? "violet" : "blue"}` };

            // если есть рендер функция в пропсах
            if(renderPoint){
                opt = {
                    iconLayout: renderCustomPointItem(renderPoint(placemark)),
                };
                renderPoint(placemark);
            }
            
            return <Placemark
                key={index}
                geometry={[coords.latitude, coords.longitude]}
                options={{
                    ...opt
                }}
                
            />;
        });
    }

    return (
        <Map
            className={`${containterClassNames} ${grayMode ? "ymap-gray-mode" : ""} `}
            defaultOptions={{ suppressMapOpenBlock: true }}
            height={height}
            instanceRef={(ref) => mapRef.current = ref}
            modules={["geocode", "SuggestView","templateLayoutFactory"]}
            width={width}
            state={{
                ...mapState,
                center: center ? center : mapState.center
            }}
            onClick={!isDisabled && onClickToMap}
            onLoad={setMapConstructor}
            
        >
            {defaultPlaceMark ? (
                <Placemark geometry={center ? center : mapState.center} />
            ) : (
                <>{renderPlacemarks()}</>
            )}
            <ZoomControl />
        </Map>
    );
};

export default YandexMap;
