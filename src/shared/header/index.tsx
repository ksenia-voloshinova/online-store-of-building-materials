import { FC } from "react";

import useGlobalData from "@/hooks/api/useGlobalData";
import Bottom from "@/shared/header/bottom";
import Print from "@/shared/header/print";
import Top from "@/shared/header/top";

const Header: FC = () => {
    return (
        <>
            <header className={"container-width mt-[0px] mb-[0px] w-full sticky top-[0px] z-[10000] " +
                "bg-white border-b-1 border-superSilver print:hidden"}
            >
                <Top />
                <Bottom />
            </header>
            <Print />
        </>
    );
};

export default Header;
