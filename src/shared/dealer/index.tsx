import { FC, ReactNode, useState } from "react";

import DealerForm from "@/shared/forms/dealerForm";
import FeedbackPopup from "@/shared/UI/popups/feedbackPopup";

interface IDealer {
    children: ReactNode;
}

const Dealer: FC<IDealer> = ({ children }) => {
    const [isOpenDealersForm, setIsOpenDealersForm] = useState<boolean>(false);

    function openDealersForm() {
        setIsOpenDealersForm(true);
    }

    function closeDealersForm() {
        setIsOpenDealersForm(false);
    }
    
    return (
        <>
            <button onClick={openDealersForm}>
                {children}
            </button>
            <FeedbackPopup isOpen={isOpenDealersForm} onClose={closeDealersForm}>
                <DealerForm />
            </FeedbackPopup>
        </>
    );
};

export default Dealer;