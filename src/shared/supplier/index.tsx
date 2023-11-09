import { FC, ReactNode, useState } from "react";

import SupplierForm from "@/shared/forms/supplierForm";
import FeedbackPopup from "@/shared/UI/popups/feedbackPopup";

interface ISupplier {
    children: ReactNode;
}

const Supplier: FC<ISupplier> = ({ children }) => {
    const [isOpenSuppliersForm, setIsOpenSuppliersForm] = useState<boolean>(false);

    function openSuppliersForm() {
        setIsOpenSuppliersForm(true);
    }

    function closeSuppliersForm() {
        setIsOpenSuppliersForm(false);
    }
    
    return (
        <>
            <button onClick={openSuppliersForm}>
                {children}
            </button>
            <FeedbackPopup isOpen={isOpenSuppliersForm} onClose={closeSuppliersForm}>
                <SupplierForm />
            </FeedbackPopup>
        </>
    );
};

export default Supplier;