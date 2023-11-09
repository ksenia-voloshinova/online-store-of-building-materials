import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { FC } from "react";

import { IVariate } from "@/types/production";
import declOfNum from "@/utils/declOfNum";

interface IVarieties {
    varieties: IVariate[];
}

const textForms = ["категория", "категории", "категорий"];

const Varieties: FC<IVarieties> = ({ varieties }) => {
    const shownVarieties = varieties.slice(0, 3);
    const hiddenVarieties = varieties.slice(3);

    function renderVarieties() {
        return shownVarieties.map(variate => {
            const { id, link, name } = variate;

            return (
                <li key={id}>
                    <Link href={link}>
                        <a className={"cursor-pointer"}>- {name}</a>
                    </Link>
                </li>
            );
        });
    }

    function renderAccordion() {
        return hiddenVarieties.map(variate => {
            const { id, link, name } = variate;

            return (
                <li key={id}>
                    <Link href={link}>
                        <p className={"cursor-pointer"}>- {name}</p>
                    </Link>
                </li>
            );
        });
    }

    return (
        <ul>
            {renderVarieties()}
            {hiddenVarieties.length !== 0 && (
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Panel>
                                {renderAccordion()}
                            </Disclosure.Panel>
                            <Disclosure.Button className={"mt-[20px] font-bold " +
                                "underline underline-offset-4"}
                            >
                                <span>{open ? "-" : "+"} </span>
                                <span>{hiddenVarieties.length} </span>
                                <span>{declOfNum(hiddenVarieties.length, textForms)} </span>
                            </Disclosure.Button>
                        </>
                    )}
                </Disclosure>
            )}
        </ul>
    );
};

export default Varieties;
