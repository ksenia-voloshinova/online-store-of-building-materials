import cookies from "js-cookie";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import { fetchChangeRegion } from "@/api/api";
import useRegionsData from "@/hooks/api/useRegionsData";
import Interceptor from "@/shared/interceptor";
import TranslatePopup from "@/shared/UI/popups/translatePopup";
import { IPopup } from "@/shared/UI/popups/types";

const RegionsPopup: FC<IPopup> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [message, setMessage] = useState<string>("");
    const { isLoading, isError, isFetching, data } = useRegionsData();
    
    async function onChangeRegion(slug: string) {
        try {
            cookies.set("userDomain", slug, {
                domain: process.env.NEXT_PUBLIC_BASE_DOMAIN,
            });
            
            const result = await fetchChangeRegion(slug);

            await router.reload();
        } catch(e) {
            setMessage("Ошибка выбора региона");   
        }
    }
    
    function renderRegions() {
        return data?.data.map(region => {
            const { id, slug, name } = region;
            
            return (
                <li 
                    key={id}
                    className={`cursor-pointer hover:text-yellowWarm
                     ${name === data?.currentRegion && "text-yellowWarm underline"}`}
                    onClick={() => onChangeRegion(slug)}
                >
                    {name}
                </li>
            );
        });
    }
    
    return (
        <TranslatePopup isOpen={isOpen} onClose={onClose}>
            <Interceptor
                errorMessage={"Не удалось загрузить список регионов :("}
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
            >
                <h1 className={"text-[24px] font-bold"}>Выберите регион</h1>
                {message && <p className={"text-red"}>{message}</p>}
                <ul>{renderRegions()}</ul>
            </Interceptor>
        </TranslatePopup>
    );
};

export default RegionsPopup;