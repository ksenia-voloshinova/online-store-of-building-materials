import Image from "next/image";
import { FC } from "react";

import useProductDetailData from "@/hooks/api/useProductDetailData";
import Interceptor from "@/shared/interceptor";

const Documentation: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailData();
    
    function renderDocumentation() {
        return data?.detailInfo.documentation.map(doc => {
            const { id, name, icon, format, size, file } = doc;
            
            return (
                <li key={id}>
                    <a className={"flex gap-[11px]"} download={file} href={file}>
                        <div className={"min-w-[18px] w-[18px] h-[22px]"}>
                            <Image alt={name} height={22} objectFit={"cover"} src={icon} width={18} />
                        </div>
                        <div>
                            <p className={"text-sm lg:text-[16px] text-cyanBlueGray"}>{name}</p>
                            <div className={"flex gap-[5px] text-xs lg:text-sm text-cyanBlueDark"}>
                                <p>Размер: {size}</p>
                                <p>Формат: {format}</p>
                            </div>
                        </div>
                    </a>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить документы товара"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {!data?.detailInfo?.documentation ? (
                <div>Нет документации</div>
            ) : (
                <ul className={"grid grid-cols-1 md:grid-cols-2 gap-[18px]"}>
                    {renderDocumentation()}
                </ul>
            )}
        </Interceptor>
    );
};

export default Documentation;