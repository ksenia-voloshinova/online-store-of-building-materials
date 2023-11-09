import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { FC } from "react";

import { IVariate } from "@/types/production";
import declOfNum from "@/utils/declOfNum";

interface IVarieties {
    varieties: IVariate[];
    onClose: (e: any) => void;
}

const textForms = ["категория", "категории", "категорий"];

const Varieties: FC<IVarieties> = ({ varieties, onClose }) => {
    const shownVarieties = varieties.slice(0, 3);
    const hiddenVarieties = varieties.slice(3);
    
    function renderAllVarieties() {
        return varieties.map(variate => {
            const { id, link, name } = variate;

            return (
                <li key={id} className={"text-xs lg:text-[16px]"}>
                    <Link href={link}>
                        <a className={"cursor-pointer"} onClick={onClose}>- {name}</a>
                    </Link>
                </li>
            );
        });
    }

    function renderVarieties() {
        return shownVarieties.map(variate => {
            const { id, link, name } = variate;

            return (
                <li key={id} className={"text-xs lg:text-[16px]"}>
                    <Link href={link}>
                        <a className={"cursor-pointer"} onClick={onClose}>- {name}</a>
                    </Link>
                </li>
            );
        });
    }

    function renderAccordion() {
        return hiddenVarieties.map(variate => {
            const { id, link, name } = variate;

            return (
                <li key={id} className={"text-xs lg:text-[16px]"}>
                    <Link href={link}>
                        <a className={"cursor-pointer"} onClick={onClose}>- {name}</a>
                    </Link>
                </li>
            );
        });
    }

    return (
        <>
            <ul className={"lg:hidden flex flex-col gap-[4px]"}>{renderAllVarieties()}</ul>
            <ul className={"hidden lg:flex flex-col gap-[4px]"}>
                {renderVarieties()}
                {hiddenVarieties.length !== 0 && (
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Panel>
                                    {renderAccordion()}
                                </Disclosure.Panel>
                                <Disclosure.Button className={"mt-[20px] font-bold " +
                                    "underline underline-offset-4 w-max"}
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
        </>
    );
};

export default Varieties;