import { FC } from "react";

import CompareIcon from "@/assets/icons/compare-sm.svg";
import useCompare from "@/hooks/useCompare";
import ButtonContainer from "@/shared/productCard/actions/ButtonContainer";

export interface ICompareButton {
    id: number;
    elementId: number;
    openAlert: (message: string | undefined) => void;
}

const CompareButton: FC<ICompareButton> = ({ id, elementId, openAlert }) => {
    const { currentProduct, toggleProductCompare } = useCompare(id, elementId);

    async function toggleCompare() {
        const { status, data } = await toggleProductCompare();

        if (status !== 200) openAlert(data.message);
    }

    return (
        <ButtonContainer
            isActive={!!currentProduct}
            onClick={toggleCompare}
        >
            <CompareIcon
                className={`${currentProduct ? "stroke-black group-hover:stroke-white" : "stroke-black"}`}
            />
        </ButtonContainer>
    );
};

export default CompareButton;
