import { FC } from "react";

import Actions from "@/shared/header/top/Actions";
import Call from "@/shared/header/top/Call";
import Links from "@/shared/header/top/Links";

const Top: FC = () => {
    return (
        <div className={"hidden md:flex justify-between items-center " +
            "border-b-1 border-superSilver"}
        >
            <Links />
            <div className={"container pt-[10px] flex items-center justify-between lg:justify-end gap-[15px] " +
                "xl:gap-[60px]"}
            >
                <Call />
                <Actions />
            </div>
        </div>
    );
};

export default Top;
