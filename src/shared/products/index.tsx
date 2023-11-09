import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import useProductionCatalogData from "@/hooks/api/useProductionCatalogData";
import Interceptor from "@/shared/interceptor";
import Varieties from "@/shared/products/Varieties";
import { IProductionCatalog } from "@/types/production";

const Products: FC = () => {
    const {
        isLoading,
        isFetching,
        isError,
        data: productionCatalog
    } = useProductionCatalogData();

    function renderProductionCatalog() {
        return productionCatalog?.map((production: IProductionCatalog) => {
            const { id, link, type, varieties, icon } = production;

            return (
                <li key={id} className={"flex flex-col items-start gap-[12px]"}>
                    <div className={"w-[40px] h-[40px] md:w-[61px] md:h-[61px]"}
                    >
                        <Image alt={type} height={61} src={icon} width={61} />
                    </div>
                    <div>
                        <Link href={link}>
                            <a className={"font-bold cursor-pointer"}>{type}</a>
                        </Link>
                        <Varieties varieties={varieties} />
                    </div>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить каталог продуктов"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            <ul className={"grid grid-cols-1 sm:grid-cols-2 " +
                "md:grid-cols-3 2xl:grid-cols-4 gap-[40px]"}
            >
                {renderProductionCatalog()}
            </ul>
        </Interceptor>
    );
};

export default Products;
