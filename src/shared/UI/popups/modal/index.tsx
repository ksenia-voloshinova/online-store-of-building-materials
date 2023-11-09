import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

import { IPopup } from "@/shared/UI/popups/types";

interface IModal extends IPopup {
    children: ReactNode;
}

const Modal: FC<IModal> = ({ isOpen, onClose, children }) => {
    return (
        <Transition appear as={Fragment} show={isOpen}>
            <Dialog as="div" className="flex justify-center items-center relative z-[10000]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed top-[0px] bottom-[0px] right-[0px] left-[0px] bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="p-[10px] fixed top-[0px] bottom-[0px] right-[0px] left-[0px] overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="p-[40px] w-full max-w-[600px] transform overflow-hidden
                             rounded-[8px] bg-white p-6 text-left align-middle shadow-xl transition-all"
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
