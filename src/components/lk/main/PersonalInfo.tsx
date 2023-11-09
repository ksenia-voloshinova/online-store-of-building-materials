import Link from "next/link";
import { FC } from "react";

import EditIcon from "@/assets/icons/pen.svg";
import { ROUTES } from "@/routes";
import { useAppSelector } from "@/store/store";

const PersonalInfo: FC = () => {
    const user = useAppSelector(({ user }) => user.data);
    const { firstName, lastName, email, phone } = user;
    
    return (
        <div className={"w-full"}>
            <div className={"pb-[10px] flex justify-between border-b-1 border-cyanBlueMiddle"}>
                <p className={"font-bold"}>Контактная информация</p>
                <Link href={ROUTES.personalInfo}>
                    <a className={"cursor-pointer"}><EditIcon /></a>
                </Link>
            </div>
            <div className={"pt-[15px] flex flex-col gap-[8px]"}>
                <p>{firstName} {lastName}</p>
                <p>{email}</p>
                {phone && <p>{phone}</p>}
            </div>
        </div>
    );
};

export default PersonalInfo;