import Image from "next/image";
import { FC } from "react";

interface IPicture {
    src: string;
    alt: string;
    plugWidth?: number;
    plugHeight?: number;
    rounded?: string
    objectFit?: "cover" | "contain";
}

const Picture: FC<IPicture> = ({
    src,
    alt,
    plugWidth = 100,
    plugHeight = 100,
    rounded = "none",
    objectFit = "cover"
}) => {
    return (
        <>
            {src ? (
                <Image
                    alt={alt}
                    className={`rounded-[${rounded}]`}
                    layout={"fill"}
                    objectFit={objectFit}
                    src={src}
                />
            ) : (
                <div className={`flex justify-center items-center w-full h-full rounded-[${rounded}]` }>
                    <Image alt={alt} height={plugHeight} src={"/static/plug.svg"}  width={plugWidth} />
                </div>
            )}
        </>
    );
};

export default Picture;
