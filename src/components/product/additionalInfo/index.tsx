import Image from "next/image";
import { FC } from "react";

import useProductDetailInfoData from "@/hooks/api/useProductDetailInfoData";
import Interceptor from "@/shared/interceptor";

const AdditionalInfo: FC = () => {
    const { isLoading, isFetching, isError, data } = useProductDetailInfoData();
    
    return (
        <Interceptor
            errorMessage={"Не удалось загрузить дополнительную информацию по товару"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {data?.additionalInfo?.title && (
                <div className={"mt-[20px] flex flex-col gap-[16px]"}>
                    <p
                        className={"text-xl lg:text-[28px] font-bold"}
                        dangerouslySetInnerHTML={{ __html: data?.additionalInfo.title ?? "" }}
                    />
                    <div className={"flex flex-col lg:flex-row gap-[24px]"}>
                        <div className={"relative w-full lg:min-w-[364px] lg:w-[364px] h-[320px] lg:h-[220px] rounded"}>
                            <Image
                                alt={data?.additionalInfo.title}
                                layout={"fill"}
                                objectFit={"cover"}
                                src={data?.additionalInfo.image ?? ""}
                            />
                        </div>
                        <p
                            dangerouslySetInnerHTML={
                                { __html: data?.additionalInfo.description ?? "" }
                            }
                        />
                    </div>
                </div>
            )}
        </Interceptor>
    );
};

export default AdditionalInfo;