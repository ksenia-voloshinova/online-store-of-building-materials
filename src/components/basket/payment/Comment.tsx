import { FC } from "react";

import MaestroIcon from "@/assets/icons/maestro.svg";
import MasterCardIcon from "@/assets/icons/mastercard.svg";
import MirIcon from "@/assets/icons/mir.svg";
import VisaIcon from "@/assets/icons/visa.svg";
import VisaElectronIcon from "@/assets/icons/visa_electron.svg";
import DefaultTextarea from "@/shared/UI/textareas/defaultTextarea";
import { setPayment } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const icons = [
    {
        id: "visa-electron",
        component: <VisaElectronIcon />,
    },
    {
        id: "visa",
        component: <VisaIcon />,
    },
    {
        id: "mastercard",
        component: <MasterCardIcon />,
    },
    {
        id: "maestro",
        component: <MaestroIcon />,
    },
    {
        id: "mir",
        component: <MirIcon />,
    }
];

const Comment: FC = () => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(({ basket }) => basket.sections.payment);

    function onChange(value: string) {
        dispatch(setPayment({
            ...payment,
            paymentData: {
                ...payment.paymentData,
                message: value
            }
        }));
    }

    function renderIcons() {
        return icons.map(icon => {
            const { id, component } = icon;

            return (
                <li
                    key={id}
                    className={"flex justify-center items-center w-[51px] h-[36px] border-1 border-whiteWarm rounded"}
                >
                    {component}
                </li>
            );
        });
    }

    return (
        <div className={"flex flex-col md:flex-row gap-[21px] w-full"}>
            <DefaultTextarea
                name={"message"}
                placeholder={"Комментарий"}
                style={"!h-[80px]"}
                value={payment.paymentData.message}
                onChange={onChange}
            />
            <ul className={"flex flex-wrap gap-[8px]"}>{renderIcons()}</ul>
        </div>
    );
};

export default Comment;
