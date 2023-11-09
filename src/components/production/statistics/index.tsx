import { FC } from "react";

import useProductionInfoData from "@/hooks/api/useProductionInfoData";
import Interceptor from "@/shared/interceptor";
import { IStatistic } from "@/types";

const Statistics: FC = () => {
    const { isLoading, isFetching, isError, data: info } = useProductionInfoData();

    function renderStatistics() {
        return info?.statistics.map((statistic: IStatistic) => {
            const { id, title, value } = statistic;

            return (
                <li key={id} className={"container py-[20px] " +
                    "flex flex-col justify-between h-[252px] " +
                    "tracking-[0.4px] bg-blueMagentaDark " +
                    "border-[0.4px] border-blueMagentaDarkLight md:border-none"}
                >
                    <p className={"max-w-[160px] text-white text-sm md:text-lg-light"}>{title}</p>
                    <p className={"text-yellowWarm text-3xl md:text-5xl"}>{value}</p>
                </li>
            );
        });
    }

    return (
        <Interceptor
            errorMessage={"Не удалось загрузить раздел со статистикой"}
            isError={isError}
            isFetching={isFetching}
            isLoading={isLoading}
        >
            {info?.statistics && (
                <ul className={"mt-[54px] grid grid-rows-2 grid-cols-2 " +
                    "md:grid-rows-1 md:grid-cols-4"}
                >
                    {renderStatistics()}
                </ul>
            )}
        </Interceptor>
    );
};

export default Statistics;
