import { FC } from "react";
import Fade from "react-reveal/Fade";

import Products from "@/shared/products";

const Catalog: FC = () => {
    return (
        <div className={"pt-[20px] flex flex-col gap-[42px]"}>
            <Fade bottom delay={0} fraction={0.03}>
                <p className={"container md:pl-[200px] text-[32px] md:text-[60px] " +
                        "lg:text-[93px] text-yellowWarm font-500"}
                >
                    Продукты
                </p>
                <div className={"container pb-[40px] md:pb-[60px] 3xl:w-2/3 3xl:self-end"}>
                    <Products />
                </div>
            </Fade>
        </div>
    );
};

export default Catalog;
