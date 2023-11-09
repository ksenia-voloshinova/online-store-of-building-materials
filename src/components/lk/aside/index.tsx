import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { ROUTES } from "@/routes";
import authService from "@/services/authService";
import tokenService from "@/services/tokenService";
import { setIsAuth, setUserInfo } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";

const LK_PAGES = [
    {
        id: "lk",
        link: ROUTES.lk,
        title: "Главная",
    },
    {
        id: "personalInfo",
        link: ROUTES.personalInfo,
        title: "Личные данные",
    },
    {
        id: "orders",
        link: ROUTES.orders,
        title: "Мои заказы",
    },
    {
        id: "addresses",
        link: ROUTES.addresses,
        title: "Мои адреса",
    },
    {
        id: "favorite",
        link: ROUTES.favorite,
        title: "Избранное",
    },
    {
        id: "changePassword",
        link: ROUTES.changePassword,
        title: "Сменить пароль",
    }
];

const Aside: FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleLogout() {
        const  { status, data } = await authService.logout();

        if (status === 200) {
            tokenService.deleteToken();
            tokenService.deleteRefreshToken();
            await router.push(ROUTES.login);
            dispatch(setIsAuth(false));
            dispatch(setUserInfo({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
            }));
        } else {
            alert(data.message);
        }
    }

    function renderLkPages() {
        return LK_PAGES.map(page => {
            const { id, title, link } = page;

            return (
                <li key={id} className={`${router.asPath === link ? "text-black" : "text-cyanBlueCool"} 
                hover:text-black duration-[200ms]`}
                >
                    <Link href={link}>{title}</Link>
                </li>
            );
        });
    }

    return(
        <div className={"p-[18px] flex flex-col gap-[5px] lg:gap-[16px] h-max lg:min-w-[270px] " +
            "bg-cyanBlueLight rounded-[8px] print:hidden"}
        >
            <h3 className={"text-cyanBlueGray font-bold"}>Моя учетная запись</h3>
            <ul className={"flex lg:flex-col flex-wrap gap-[10px] lg:gap-[8px] text-sm"}>
                {renderLkPages()}
                <li className={"text-cyanBlueCool hover:text-black duration-[200ms]"}>
                    <button type={"button"} onClick={handleLogout}>Выйти</button>
                </li>
            </ul>
        </div>
    );
};

export default Aside;
