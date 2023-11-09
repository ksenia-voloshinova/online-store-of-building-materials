import { FC } from "react";

import Compare from "@/assets/icons/compare.svg";
import ActionContainer from "@/shared/containers/actionContainer";
import { getCompareProductsCount } from "@/store/selectors/compareSelector";
import { useAppSelector } from "@/store/store";

interface ICompareLink {
    className: string;
}

const CompareLink: FC<ICompareLink> = ({ className }) => {
    const productsCount = useAppSelector(getCompareProductsCount);

    return (
        <ActionContainer value={productsCount}>
            <Compare className={className} height={24} width={24} />
        </ActionContainer>
    );
};

export default CompareLink;
