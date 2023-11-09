import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";

import Bc from "@/shared/UI/popups/menuPopup/Bc";
import Content from "@/shared/UI/popups/menuPopup/Content";
import SearchPopup from "@/shared/UI/popups/searchPopup";

interface IMenuPopup {
    isOpen: boolean;
    onClose: () => void;
}

const MenuPopup: FC<IMenuPopup> = ({ isOpen, onClose }) => {
    const [isOpenSearchPopup, setIsOpenSearchPopup] = useState<boolean>(false);

    function openSearchPopup() {
        setIsOpenSearchPopup(true);
    }
    
    function closeSearchPopup() {
        setIsOpenSearchPopup(false);
    }
    
    return (
        <>
            <Transition as={Fragment} show={isOpen}>
                <Dialog 
                    as="div"
                    className="fixed inset-0 overflow-y-auto z-[100]"
                    onClose={onClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-x-[100vw]"
                        enterTo="opacity-100 translate-x-0"
                        leave="ease-in duration-300"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 translate-x-[100vw]"
                    >
                        <Dialog.Panel className={"fixed top-[65px] md:top-[138px] w-full h-full " +
                            "flex justify-end bg-yellowWarm"}>
                            <Bc />
                            <Content openSearchPopup={openSearchPopup} onCloseMenu={onClose} />
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <SearchPopup isOpen={isOpenSearchPopup} onClose={closeSearchPopup} />
        </>
    );
};

export default MenuPopup;