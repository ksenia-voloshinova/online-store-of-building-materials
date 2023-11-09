import { FC } from "react";

import Copyright from "@/shared/footer/links/Copyright";
import Menu from "@/shared/footer/links/Menu";
import Networks from "@/shared/footer/links/Networks";

const Links: FC = () => {
    return (
        <div className={"container py-containerXl flex flex-col " +
            "justify-between gap-[40px] w-full md:w-7/12 bg-blueMagentaDark"}
        >
            <div className={"flex justify-between gap-[30px]"}>
                <Menu />
                <Networks />
            </div>
            <Copyright />
        </div>
    );
};

export default Links;