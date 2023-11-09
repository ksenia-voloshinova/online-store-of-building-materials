import React, { FC } from "react";

import OQCode from "@/assets/icons/QR-code-print.svg";

const Print: FC = () => {
    return (
        <div className={"hidden print:flex justify-between items-end"}>
            <p>ООО «Дёке Трейд Маркетинг» <br/>
                Реализация фасадных и кровельных материалов
            </p>
            <div className={"flex flex-col gap-[15px]"}>
                <OQCode />
                <p className={"text-right"}>
                    +7 (495) 744-02-42 <br/>
                    docke.ru
                </p>
            </div>
        </div>
    );
};

export default Print;
