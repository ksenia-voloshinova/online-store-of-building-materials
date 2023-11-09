import { FC } from "react";

import Address from "@/components/lk/main/Address";
import LastOrders from "@/components/lk/main/LastOrders";
import PersonalInfo from "@/components/lk/main/PersonalInfo";
import { useAppSelector } from "@/store/store";

const Main: FC = () => {
    const user = useAppSelector(({ user }) => user.data);
    
    return (
        <div className={"flex flex-col gap-[40px]"}>
            <div className={"flex flex-col gap-[8px]"}>
                <p className={"text-xs font-bold"}>Здравствуйте{user.firstName && <span>, {user.firstName}</span>}!</p>
                <p className={"text-sm"}>На этой странице вы можете просматривать основные данные своей 
                    учетной записи и редактировать личную информацию. 
                    Для выбора нужной операции нажмите на соответствующую ссылку.
                </p>
            </div>
            <LastOrders />
            <div className={"flex flex-col gap-[24px]"}>
                <p className={"text-[22px] font-bold"}>Личные данные</p>
                <div className={"flex flex-col md:flex-row gap-[24px]"}>
                    <PersonalInfo />
                    <Address />
                </div>
            </div>
        </div>
    );
};

export default Main;