import { FC } from "react";

import LoaderCircle from "@/assets/icons/loader.svg";

interface ILoader {
    width?: number;
    height?: number;
}

const Loader: FC<ILoader> = ({ width = 100, height= 100 }) => {
    return <LoaderCircle height={width} width={height} />;
};

export default Loader;