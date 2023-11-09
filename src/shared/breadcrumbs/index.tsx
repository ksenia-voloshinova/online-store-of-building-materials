import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { IBreadcrumb } from "@/types";

interface IBreadcrumbs {
    data: IBreadcrumb[];
}

const Breadcrumbs: FC<IBreadcrumbs> = ({ data }) => {
    const router = useRouter();

    function renderBreadcrumbs() {
        return data.map((d, index) => {
            const { id, title, link } = d;
            const isLast = index === data.length - 1;

            return (
                <li key={id} className={"flex gap-[5px]"}>
                    <Link href={link}>
                        <a className={` 
                        ${isLast
                    ? "text-black pointer-events-none"
                    : "text-cyanBlueMiddle cursor-pointer"}`}>
                            {title} /
                        </a>
                    </Link>
                </li>
            );
        });
    }

    return (
        <ul className={"flex flex-wrap gap-[5px] print:hidden"}>
            {renderBreadcrumbs()}
        </ul>
    );
};

export default Breadcrumbs;
