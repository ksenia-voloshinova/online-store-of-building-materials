import { FC } from "react";

import Card from "@/components/product/info/Card";
import Photos from "@/components/product/info/Photos";
import Top from "@/components/product/info/Top";

const Info: FC = () => {
    return (
        <div className={"mt-[26px] flex flex-col lg:flex-row gap-[16px] md:gap-[30px]"}>
            <div className={"lg:hidden"}><Top /></div>
            <Photos />
            <Card />
        </div>
    );
};

export default Info;