import Link from "next/link";
import { FC, ReactNode } from "react";

interface IFormContainer {
    children: ReactNode;
    isError?: boolean;
    isSuccess?: boolean;
    title?: string;
    message?: string;
    links?: ILink[];
    showRequire?: boolean;
}

interface ILink {
    id: string | number;
    href: string;
    title: string;
}

const FormContainer: FC<IFormContainer> = ({ 
    children,
    isError,
    isSuccess,
    title= "",
    message,
    links,
    showRequire = true,
}) => {
    function renderLinks() {
        return links?.map(link => {
            const { id, title, href } = link;
            
            return (
                <li key={id}>
                    <Link href={href}>
                        <a 
                            className={"cursor-pointer duration-[200ms] hover:text-yellowWarm hover:underline"}>
                            {title}
                        </a>
                    </Link>
                </li>
            );
        });    
    }
    
    return (
        <div className={"flex flex-col gap-[16px]"}>
            {title && <h1 className={"text-[24px] md:text-[28px]"}>{title}</h1>}
            {isError && <p className={"text-red"}>{message}</p>}
            {isSuccess && <p className={"text-greenWarm"}>{message}</p>}
            {children}
            {showRequire && <p className={"text-xs md:text-sm text-cyanBlueDark"}>*Обязательные поля</p>}
            {links && <ul className={"flex flex-col sm:flex-row justify-between gap-[15px] text-sm md:text-[16px]"}>
                {renderLinks()}
            </ul>}
        </div>
    );
};

export default FormContainer;