import { FC, memo } from "react";

import Aside from "@/components/catalog/content/Aside";
import Body from "@/components/catalog/content/Body";
import Empty from "@/components/catalog/content/Empty";
import useCatalogData from "@/hooks/api/useCatalogData";

const Content: FC = () => {
    const { isLoading, isFetching, data: catalog } = useCatalogData();
    
    return (
        <div className={"mt-[24px] mb-[26px] md:mb-[70px] flex gap-[16px]"}>
            <Aside />
            <div className={"w-full"}>
                {catalog?.products.length === 0 && !isLoading && !isFetching ? (
                    <Empty />
                ): (
                    <Body />
                )}
            </div>
        </div>
    );  
};

export default memo(Content);