import Image from "next/image";
import { FC } from "react";

interface IPhoto {
    photo: string;
    name: string;
}

const Photo: FC<IPhoto> = ({ photo, name }) => {
    const initials = name
        .split(" ")
        .reduce((acc, item, index) => {
            if (index > 1) return acc;

            return acc + item[0].toUpperCase();
        }, "");
    
    return (
        <div
            className={"flex items-center justify-center min-w-[36px] w-[36px] h-[36px] " +
                "border-1 rounded-[50%] overflow-hidden"}
        >
            {photo ? (
                <Image alt={name} height={36} objectFit={"cover"} src={photo} width={36} />
            ) : (
                <p className={"text-sm"}>{initials}</p>
            )}
        </div>
    );
};

export default Photo;