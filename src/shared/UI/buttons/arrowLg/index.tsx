import { FC } from "react";

import Arrow from "@/assets/icons/arrow.svg";

interface IArrowLg {
    buttonStyle: string;
    arrowStyle: string;
}

const ArrowLg: FC<IArrowLg> = ({ arrowStyle, buttonStyle }) => {
    return (
        <button className={buttonStyle}>
            <Arrow className={arrowStyle} />
        </button>
    );
};

export default ArrowLg;