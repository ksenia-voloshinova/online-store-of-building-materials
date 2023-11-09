import Link from "next/link";
import { FC, ReactNode } from "react";

import PrivateIcon from "@/assets/icons/private.svg";
import { ROUTES } from "@/routes";
import { useAppSelector } from "@/store/store";

interface IButton {
    isPrivate: boolean;
    isClosed: boolean;
    isOpen: boolean;
    title: string;
    index: number;
    children?: ReactNode;
    open: () => void;
}

const Button: FC<IButton> = ({
    isOpen,
    isPrivate,
    isClosed,
    index,
    title,
    children,
    open
}) => {
    const basketProducts = useAppSelector(({ basket }) => basket.products);
    const isEmptyBasket = !(!!basketProducts.length) && isPrivate;
    const isLocked = isClosed || isEmptyBasket;

    return (
        <button
            disabled={isLocked}
            className={`p-[30px] flex flex-col justify-between md:flex-row gap-[16px] w-full
                            ${isOpen && "lg:max-w-[265px] md:flex-col"} 
                            ${isLocked ? "bg-cyanBlueLight-500" : "bg-cyanBlueLight"} rounded-[8px]`}
            onClick={open}
        >
            <p className={"flex gap-[20px]"}>
                {isLocked ? (
                    <PrivateIcon height={24} width={24} />
                ) : (
                    <span className={"text-cyanBlueMiddle"}>{index}.</span>
                )}
                <span className={`${isLocked && "text-cyanBlueMiddle"}`}>
                    {title}
                </span>
            </p>
            {children && !isEmptyBasket && (
                <div className={"flex flex-wrap justify-center items-center gap-[24px]"}>
                    {children}
                </div>
            )}
            {isClosed && (
                <div>Пункт будет доступен после
                    <Link href={ROUTES.login}><a className={"text-yellowWarm"}> авторизации</a></Link>
                </div>
            )}
        </button>
    );
};

export default Button;
