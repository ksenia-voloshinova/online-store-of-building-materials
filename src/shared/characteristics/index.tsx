import { FC } from "react";

import { ICharacteristic } from "@/types/productDetail";

interface ICharacteristicsC {
    data: ICharacteristic[];
}

const Characteristics: FC<ICharacteristicsC> = ({ data }) => {
    function renderCharacteristics() {
        return data.map(d => {
            const { id, name, value } = d;

            return (
                <li key={id} className={"flex gap-[30px]"}>
                    <p className={"w-1/2 min-h-[40px] text-sm lg:text-[16px] text-cyanBlueDark break-all"}>{name}</p>
                    <p className={"w-1/2 text-sm lg:text-[16px] text-cyanBlueGray break-all"}>{value || "-"}</p>
                </li>
            );
        });
    }

    return (
        <>
            {renderCharacteristics()}
        </>
    );
};

export default Characteristics;
