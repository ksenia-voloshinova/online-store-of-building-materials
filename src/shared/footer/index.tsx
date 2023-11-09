import React, { FC } from "react";

import Info from "@/shared/footer/info";
import Links from "@/shared/footer/links";
import Print from "@/shared/footer/print";

const Footer: FC = () => {
    return (
        <footer className={"mt-auto"} style={{ background: "linear-gradient(to right, #FBB900 50%, #313033 50%)" }}>
            <div className={"container-width flex flex-col md:flex-row print:hidden"}>
                <Info />
                <Links />
            </div>
            <Print />
        </footer>
    );
};

export default Footer;
