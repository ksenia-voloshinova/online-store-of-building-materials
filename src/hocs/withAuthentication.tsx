import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

import { ROUTES } from "@/routes";
import authService from "@/services/authService";
import profileService from "@/services/profileService";
import tokenService from "@/services/tokenService";
import Loader from "@/shared/loader";
import { setBasket } from "@/store/slices/basketSlice";
import { setCompareProducts } from "@/store/slices/compareSlice";
import { setFavoritesData } from "@/store/slices/favoritesSlice";
import { setIsAuth, setUserInfo } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { IAuth } from "@/types";

interface IWithAuthentication {
    auth: IAuth;
}

function withAuthentication<T extends IWithAuthentication>(WrappedComponent: ComponentType<T>) {
    return (props: any) => {
        const { status, user, basket, compareProducts, favoritesProducts, isPrivate, isPublic } = props.auth;
        const router = useRouter();
        const dispatch = useAppDispatch();
        const [isLoading, setLoading] = useState<boolean>(status !== 200 || isPublic);

        useEffect(() => {
            onMount();
        }, []);

        async function checkSuccess(cb: Function) {
            if (isPublic) {
                await router.push(ROUTES.lk);

                return;
            }

            cb();
        }

        async function checkError(cb: Function) {
            if (isPrivate) {
                await router.push(ROUTES.login);

                return;
            }

            cb();
        }

        async function onMount() {
            if (status === 200) {
                await checkSuccess(() => {
                    const userData = Object.entries(user).reduce((acc, [key, value]) => {
                        return { ...acc, [key]: value ?? "" };
                    }, {});

                    dispatch(setUserInfo(userData));
                    dispatch(setIsAuth(true));
                    setLoading(false);
                });
            } else if (status === 401) {
                if (tokenService.getRefreshToken()) {
                    await getRefresh();
                } else {
                    await checkError(() => {
                        setLoading(false);
                    });
                }
            } else if (status >= 500) {
                await router.push(ROUTES.error500);
            } else {
                await router.push(ROUTES.error404);
            }

            dispatch(setBasket(basket));
            dispatch(setCompareProducts(compareProducts));
            dispatch(setFavoritesData(favoritesProducts));
        }

        async function getRefresh() {
            const { status } = await authService.refresh();

            if (status === 200) {
                await checkSuccess(async () => {
                    await getUserInfo();
                    setLoading(false);
                });
            } else {
                await checkError(() => {
                    setLoading(false);
                });
            }
        }

        async function getUserInfo() {
            const { status, data } = await profileService.getUserPersonalInfo();

            if (status === 200) {
                await checkSuccess(() => {
                    dispatch(setIsAuth(true));
                    dispatch(setUserInfo(data));
                });
            } else {
                await checkError(() => {
                    dispatch(setIsAuth(false));
                    dispatch(setUserInfo(data));
                });
            }
        }

        if (isLoading) return (
            <div className={"flex items-center h-[100vh]"}>
                <Loader />
            </div>
        );

        return <WrappedComponent {...props} />;
    };
}

export default withAuthentication;
