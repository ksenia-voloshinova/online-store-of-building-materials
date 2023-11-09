import { FC } from "react";

const Empty: FC = () => {
    return (
        <div className={"flex flex-col items-center"}>
            <p className={"mb-[30px] font-bold"}>Ничего не найдено!</p>
            <p>Сбросьте фильтры</p>
            <p>Возможно, предложения с такими параметрами очень редки</p>
        </div>
    );   
};

export default Empty;