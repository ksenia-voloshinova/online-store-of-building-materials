import { FC } from "react";

import ProductsCount from "@/components/catalog/productsCount";
import Sort from "@/components/catalog/sort";
import Switch from "@/components/catalog/switch";

const Handles: FC = () => {
    return (
        <div className={"flex flex-col sm:flex-row gap-[15px] items-start sm:items-center sm:justify-between"}>
            <ProductsCount />
            <div className={"flex items-center gap-[24px]"}>
                <Sort />
                {/*<Switch />*/}
            </div>
        </div>
    );
};

export default Handles;