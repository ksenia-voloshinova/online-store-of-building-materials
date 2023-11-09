import { FC } from "react";

import { IBannerImage } from "@/types";

interface IBackground {
    image: IBannerImage | null | undefined;
}

const Background: FC<IBackground> = ({ image }) => {
    return (
        <picture
            className="w-full h-full object-cover"
        >
            <source
                media="(min-width: 1024px)"
                srcSet={image?.desktop}
            />
            <source
                media="(min-width: 768px), (min-aspect-ratio: 13 / 9)"
                srcSet={image?.table}
            />
            <img
                alt="bc"
                className={"w-full h-full object-cover"}
                src={image?.mobile}
            />
        </picture>
    );
};

export default Background;
