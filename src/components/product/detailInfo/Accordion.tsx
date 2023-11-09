import { Disclosure, Tab, Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";

import Arrow from "@/assets/icons/arrow-light.svg";

interface IAccordion {
    accordions: {
        id: number;
        title: string;
        component: ReactNode;
    }[]
}

const Accordion: FC<IAccordion> = ({ accordions }) => {
    function renderAccordions() {
        return accordions.map(accordion => {
            const { id, title, component } = accordion;

            return (
                <Disclosure key={id} defaultOpen={false}>
                    {({ open }) => (
                        <div className={"py-[8px] px-[18px] flex flex-col gap-[24px] border-1 border-blueMagenta"}>
                            <Disclosure.Button className={"flex justify-between"}>
                                <p className={"text-sm font-bold"}>
                                    {title}
                                </p>
                                <Arrow className={`duration-[300ms] ${!open && "rotate-180"}`} />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                                show={open}
                            >
                                <Disclosure.Panel static>
                                    {component}
                                </Disclosure.Panel>
                            </Transition>
                        </div>
                    )}
                </Disclosure>
            );
        });
    }
    
    return (
        <div className={"flex flex-col gap-[8px]"}>
            {renderAccordions()}
        </div>
    );
};

export default Accordion;