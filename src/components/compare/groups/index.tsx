import React, { FC, useEffect, useRef, useState } from "react";

import CharacteristicFilter from "@/components/compare/groups/CharacteristicFilter";
import VisibleProducts from "@/components/compare/groups/VisibleProducts";
import ProductsSlider from "@/shared/productsSlider";
import SquareButton from "@/shared/UI/buttons/squareButton";
import { getCompareCharacteristic } from "@/store/selectors/compareSelector";
import { useAppSelector } from "@/store/store";

const Groups: FC = () => {
    const [activeGroup, setActiveGroup] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [showDifferences, setShowDifferences] = useState<boolean>(false);
    const productsRef = useRef<HTMLUListElement>(null);
    const groups = useAppSelector((state) => getCompareCharacteristic(state, showDifferences));

    useEffect(() => {
        if (activeGroup || !groups[0]) return;

        setActiveGroup(groups[0]?.groupId);
    }, [groups]);

    function renderGroups() {
        return groups.map(group => {
            const { groupId, groupName, data } = group;
            const isActive = activeGroup === groupId;

            return (
                <li
                    key={groupId}
                >
                    <SquareButton styles={`${isActive && "!bg-yellowWarm"}`} onClick={() => setActiveGroup(groupId)}>
                        {groupName}
                    </SquareButton>
                </li>
            );
        });
    }

    function renderProducts() {
        return groups.map(group => {
            return (
                <li key={group.groupId} className={`${activeGroup === group.groupId ? "block" : "hidden"}`}>
                    <ProductsSlider
                        data={group.data}
                        title={""}
                        onSlideChange={setActiveIndex}
                    />
                </li>
            );
        });
    }

    return (
        <div className={"mt-[40px]"}>
            {!!groups.length ? (
                <>
                    <VisibleProducts
                        activeGroupId={activeGroup ?? 0}
                        activeIndex={activeIndex}
                        productsRef={productsRef}
                    />
                    <ul className={"flex flex-wrap gap-[10px]"}>{renderGroups()}</ul>
                    <CharacteristicFilter onChange={setShowDifferences} />
                    <ul ref={productsRef}>{renderProducts()}</ul>
                </>
            ) : (
                <div>Список сравнения пуст</div>
            )}
        </div>
    );
};

export default React.memo(Groups);
