import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import usePartners from "@/hooks/api/usePartners";
import useProductionCatalogData from "@/hooks/api/useProductionCatalogData";
import Interceptor from "@/shared/interceptor";
import Loader from "@/shared/loader";
import Varieties from "@/shared/UI/popups/categoriesPopup/Varieties";
import { IProductionCatalog } from "@/types/production";

interface ICategories {
    onClose: (e: any) => void;
}

const Categories: FC<ICategories> = ({ onClose }) => {
    const {
        isLoading,
        isFetching,
        isError,
        data: productionCatalog
    } = useProductionCatalogData();
    const {} = usePartners();

    function renderProductionCatalog() {
        return productionCatalog?.map((production: IProductionCatalog) => {
            const { id, link, type, varieties, icon } = production;

            return (
                <li key={id} className={"flex flex-col items-start gap-[12px] text-xs md:text-[16px]"}>
                    <div className={"hidden lg:block w-[40px] h-[40px] md:w-[61px] md:h-[61px]"}
                    >
                        <Image alt={type} height={61} src={icon} width={61} />
                    </div>
                    <div className={"flex flex-col gap-[8px]"}>
                        <Link href={link}>
                            <a className={"font-bold cursor-pointer"} onClick={onClose}>{type}</a>
                        </Link>
                        <Varieties varieties={varieties} onClose={onClose} />
                    </div>
                </li>
            );
        });
    }
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить каталог"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
            loader={<Loader />}
        >
            <ul className={"p-[20px] lg:p-[60px] grid h-max grid-cols-2 sm:grid-cols-3 " +
                "2xl:grid-cols-4 gap-[20px] md:gap-[40px]"}
            >
                {renderProductionCatalog()}
            </ul>
        </Interceptor>
    );
};

export default Categories;