import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";

interface IZoom {
    height: number;
    width: number;
    img: string;
    transitionTime?: number;
    scale: number;
}

interface IZoomState {
    zoom: boolean;
    mouseX: number;
    mouseY: number;
}

const Zoom: FC<IZoom> = ({ height,
    img,
    transitionTime = 0.1,
    width,
    scale
}) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const [zoomState, setZoomState] = useState<IZoomState>({
        zoom: false,
        mouseX: 0,
        mouseY: 0,
    });
    const outerDivStyle = {
        height,
        width,
        overflow: "hidden",
    };
    const innerDivStyle = {
        height,
        transition: `transform ${transitionTime}s ease-out`,
        transformOrigin: `${zoomState.mouseX}% ${zoomState.mouseY}%`,
        transform: zoomState.zoom ? `scale(${scale})` : "scale(1.0)",
    };

    function handleMouseOver() {
        setZoomState({
            ...zoomState,
            zoom: true,
        });
    }

    function handleMouseOut() {
        setZoomState({
            ...zoomState,
            zoom: false,
        });
    }

    function handleMouseMovement(e: any) {
        const offsetLeft = imageRef?.current?.getBoundingClientRect().left ?? 0;
        const offsetTop = imageRef?.current?.getBoundingClientRect().top ?? 0;
        const width = imageRef?.current?.style.width ?? "0";
        const height = imageRef?.current?.style.height ?? "0";
        const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
        const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

        setZoomState({
            zoom: true,
            mouseX: x,
            mouseY: y,
        });
    }

    return (
        <div
            ref={imageRef}
            className={"zoom-container"}
            style={outerDivStyle}
            onMouseMove={handleMouseMovement}
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
        >
            <div
                style={{
                    ...innerDivStyle,
                }}
            >
                <Image alt={"image"} layout={"fill"} objectFit={"cover"} src={img} />
            </div>
        </div>
    );
};

export default Zoom;
