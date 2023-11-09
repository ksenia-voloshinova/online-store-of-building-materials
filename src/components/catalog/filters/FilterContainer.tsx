import { Disclosure, Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";

import Arrow from "@/assets/icons/arrow-light.svg";

interface IFilterContainer {
    children: ReactNode;
    title: string;
    isOpen?: boolean;
}

const FilterContainer: FC<IFilterContainer> = ({ title, isOpen= false, children }) => {
    return (
        <Disclosure defaultOpen={isOpen}>
            {({ open }) => (
                <div className={"py-[16px] px-[18px] flex flex-col gap-[24px] border-1 border-blueMagenta"}>
                    <Disclosure.Button className={"flex justify-between items-center"}>
                        <p className={"text-[40px] text-cyanBlueCool font-light leading-[50px] tracking-[-0.02em]"}>
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
                        <Disclosure.Panel static className={"flex flex-col gap-[13px]"}>
                            {children}
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
};

export default FilterContainer;