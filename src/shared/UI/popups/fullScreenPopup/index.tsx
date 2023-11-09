import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

import Close from "@/assets/icons/cross.svg";
import { IPopup } from "@/shared/UI/popups/types";

interface IFullScreenPopup extends IPopup{
    children: ReactNode;
    closeStyle?: string;
}

const FullScreenPopup: FC<IFullScreenPopup> = ({ 
    children,
    isOpen,
    onClose,
    closeStyle = ""
}) => {
    return (
        <Transition
            as={Fragment}
            show={isOpen}
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-[10000]"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0 translate-x-[100vw]"
                    enterTo="opacity-100 translate-x-0"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-[100vw]"
                >
                    <Dialog.Panel className={"overflow-auto " +
                        "fixed top-[0px] right-[0px] h-full w-full bg-white"}
                    >
                        <button 
                            className={`absolute z-[1000] right-[0px] top-[0px] flex items-center justify-center 
                            w-[35px] h-[35px] md:w-[60px] md:h-[60px] bg-blueMagentaDark ${closeStyle}`}
                            onClick={onClose}
                        >
                            <Close />
                        </button>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default FullScreenPopup;