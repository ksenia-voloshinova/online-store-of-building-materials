import { RadioGroup } from "@headlessui/react";
import { FC } from "react";

import List from "@/assets/icons/list.svg";
import Plate from "@/assets/icons/plate.svg";
import DefaultSwitcher from "@/shared/UI/switcher/defaultSwitcher";
import { setCardType } from "@/store/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Switch: FC = () => {
    const dispatch = useAppDispatch();
    const cardType = useAppSelector(({ catalog }) => catalog.cardType);
    const switchers = [
        {
            code: "list",
            name: <List className={`${cardType === "list"
                ? "fill-cyanBlueGray"
                : "fill-cyanBlueDark"}`}  />
        },
        {
            code: "plate",
            name: <Plate className={`${cardType === "plate"
                ? "fill-cyanBlueGray"
                : "fill-cyanBlueDark"}`}  />
        }
    ];

    function handleSwitcher(id: string) {
        dispatch(setCardType(id));
    }

    return (
        <RadioGroup value={cardType} onChange={handleSwitcher}>
            <div className={"flex bg-cyanBlueLight rounded-[4px]"}>
                <DefaultSwitcher defaultValue={"plate"} switchers={switchers} onClick={handleSwitcher} />
            </div>
        </RadioGroup>
    );
};

export default Switch;
