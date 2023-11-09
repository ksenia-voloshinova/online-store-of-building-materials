import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useRef } from "react";

import { IAlert } from "@/shared/UI/alerts/types";

const DefaultAlert: FC<IAlert> = ({ isOpen, status, message, onClose }) => {
    const refTimeout = useRef<any>(null);

    useEffect(() => {
        if (!isOpen) return;

        closeAlert();
    }, [isOpen, status, message]);

    function closeAlert() {
        clearTimeout(refTimeout.current);

        refTimeout.current = setTimeout(() => {
            onClose();
        }, 3000);
    }

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
                    <div className={`p-[15px] fixed top-[80px] md:top-[170px] right-[0px] h-max w-[300px]
                     ${status === "success" 
            ? "bg-greenWarm-500"
            : status === "info" 
                ? "bg-blue-600" : "bg-red-300" } font-bold rounded-l`}
                    >
                        {message}
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default DefaultAlert;
