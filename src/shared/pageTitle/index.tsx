import { FC } from "react";

interface IPageTitle {
    title: string;
}

const PageTitle: FC<IPageTitle> = ({ title }) => {
    return (
        <h1 className={"text-[24px] md:text-[28px] font-bold"}>{title}</h1>
    );
};

export default PageTitle;
