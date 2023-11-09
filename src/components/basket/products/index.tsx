import { FC } from "react";

import Info from "@/components/basket/products/Info";
import List from "@/components/basket/products/List";
import DefaultButton from "@/shared/UI/buttons/defaultButton";
import { setSectionsActive } from "@/store/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Products: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(({ user }) => user.isAuth);
    const products = useAppSelector(({ basket }) => basket.products);

    function handleNext() {
        dispatch(setSectionsActive("shipping"));
    }

    return (
        <div>
            <List />
            <Info />
            <DefaultButton isDisabled={!isAuth || !products.length} onClick={handleNext}>Продолжить</DefaultButton>
        </div>
    );
};

export default Products;
