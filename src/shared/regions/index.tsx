import { FC, useState } from "react";

import useRegionsData from "@/hooks/api/useRegionsData";
import RegionsPopup from "@/shared/UI/popups/regionsPopup";

interface IRegions {
    style?: string;
}

const Regions: FC<IRegions> = ({ style = "" }) => {
    const [isOpenRegionsPopup, setIsOpenRegionsPopup] = useState<boolean>(false);
    const { data } = useRegionsData();

    function openRegionsPopup() {
        setIsOpenRegionsPopup(true);
    }

    function closeRegionsPopup() {
        setIsOpenRegionsPopup(false);
    }

    return (
        <>
            <button className={style} onClick={openRegionsPopup}>{data?.currentRegion}</button>
            <RegionsPopup isOpen={isOpenRegionsPopup} onClose={closeRegionsPopup} />
        </>
    );
};

export default Regions;