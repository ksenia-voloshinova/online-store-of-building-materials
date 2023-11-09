import { FC } from "react";

import useGlobalData from "@/hooks/api/useGlobalData";
import Regions from "@/shared/regions";

const Call: FC = () => {
    const { data } = useGlobalData();

    return (
        <div className={"flex flex-col"}>
            <a 
                className={"xl:text-[22px] font-bold leading-[26px] whitespace-nowrap"}
                href={`tel:${data?.phone.link}`}
            >
                {data?.phone.text}
            </a>
            <Regions style={"w-max text-sm text-cyanBlueDark"} />
        </div>
    );
};

export default Call;