import { FC } from "react";

const Bc: FC = () => {
    return (
        <picture
            className="hidden sm:block absolute top-[0px] 
                    bottom-[0px] left-[0px] right-[0px] w-full h-full"
        >
            <source
                media="(min-width: 1024px)"
                srcSet="/static/menu-lg.jpg"
            />
            <source
                media="(min-width: 640px), (min-aspect-ratio: 13 / 9)"
                srcSet="/static/menu-md.jpg"
            />
            <img
                alt="bc"
                className={"w-full h-full object-cover"}
                src="/static/menu-md.jpg"
            />
        </picture>
    );
};

export default Bc;