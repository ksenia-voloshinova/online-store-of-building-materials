import { FC, useEffect } from "react";

import Accordion from "@/components/product/detailInfo/Accordion";
import Characteristics from "@/components/product/detailInfo/Characteristics";
import Description from "@/components/product/detailInfo/Description";
import Documentation from "@/components/product/detailInfo/Documentation";
import Tabs from "@/components/product/detailInfo/Tabs";
import Reviews from "@/components/product/reviews";
import profileService from "@/services/profileService";
import { setIsAuth, setUserInfo } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";

const DetailInfo: FC = () => {
    const dispatch = useAppDispatch();
    const content = [
        {
            id: 1,
            title: "Характеристики",
            component: <Characteristics />
        },
        {
            id: 2,
            title: "Описание",
            component: <Description />
        },
        {
            id: 3,
            title: "Документация",
            component: <Documentation />
        },
        {
            id: 4,
            title: "Отзывы",
            component: <Reviews />
        }
    ];
    
    useEffect(() => {
        getPersonalInfo();
    }, []);

    async function getPersonalInfo() {
        const { data, status } = await profileService.getUserPersonalInfo();

        if (status === 200) {
            dispatch(setIsAuth(true));
            dispatch(setUserInfo(data));
        } else {
            dispatch(setIsAuth(false));
            dispatch(setUserInfo({
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }));
        }
    }

    return (
        <div className={"mt-[17px] lg:mt-[38px]"}>
            <div className={"hidden md:block"}>
                <Tabs tabs={content} />
            </div>
            <div className={"md:hidden"}>
                <Accordion accordions={content} />
            </div>
        </div>
    );
};

export default DetailInfo;