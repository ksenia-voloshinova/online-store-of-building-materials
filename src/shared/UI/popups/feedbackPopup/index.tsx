import { FC, ReactNode } from "react";

import FullScreenPopup from "@/shared/UI/popups/fullScreenPopup";
import { IPopup } from "@/shared/UI/popups/types";

interface IFeedbackPopup extends IPopup {
    children: ReactNode;
}

const FeedbackPopup: FC<IFeedbackPopup> = ({ isOpen, onClose, children }) => {
    return (
        <FullScreenPopup closeStyle={"!bg-yellowWarm"} isOpen={isOpen} onClose={onClose}>
            <div className={"flex flex-row-reverse lg:flex-row h-full"}>
                <div className={"p-[20px] sm:p-[40px] lg:p-[80px] relative z-[100] min-h-full h-max w-full " +
                    "sm:w-8/12 lg:w-1/2 bg-white"}
                >
                    {children}
                </div>
                <picture className={"absolute top-[0px] bottom-[0px] left-[0px] lg:relative w-1/2 object-cover"}>
                    <source
                        media={"(min-width: 1440px) and (min-height: 600px)"}
                        srcSet={"/static/feedback-bg-lg.jpg"}
                    />
                    <img
                        alt={"bc"}
                        className={"w-full h-full object-cover"}
                        draggable={"false"}
                        src={"/static/feedback-bg-lg.jpg"}
                    />
                </picture>
            </div>
        </FullScreenPopup>
    );
};

export default FeedbackPopup;