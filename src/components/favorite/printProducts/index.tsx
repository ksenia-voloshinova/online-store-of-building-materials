import { FC } from "react";

import Picture from "@/shared/picture";
import {
    getFavoriteProductsFullPrice,
    getFavoriteProductsVolumes,
    getFavoriteProductsWeights
} from "@/store/selectors/favoritesSelector";
import { useAppSelector } from "@/store/store";

const PrintProducts: FC = () => {
    const { favorites } = useAppSelector(({ favorites }) => favorites.data);
    const totalPrice = useAppSelector(getFavoriteProductsFullPrice);
    const totalWeights = useAppSelector(getFavoriteProductsWeights);
    const totalVolumes = useAppSelector(getFavoriteProductsVolumes);

    function renderProducts() {
        return favorites.map(product => {
            const { name, image, article, volume, weight, id, basePrice, isSalable } = product;

            return (
                <li key={id} className={"py-[16px] grid gap-[15px] border-b-1 border-whiteWarm " +
                    "grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"}>
                    <div className={"flex gap-[24px]"}>
                        <div className={"relative min-w-[73px] h-[73px]"}>
                            <Picture alt={name} plugHeight={73} plugWidth={73} src={image} />
                        </div>
                        <div className={"flex flex-col justify-between"}>
                            <p className={"font-bold"}>{name}</p>
                            <p className={"text-sm"}>Артикул: {article}</p>
                        </div>
                    </div>
                    <div className={"font-bold"}>{weight}</div>
                    <div className={"font-bold"}>{volume}</div>
                    <div className={"font-bold"}>{isSalable ? basePrice : "-"}</div>
                </li>
            );
        });
    }

    return (
        <div className={"hidden print:block"}>
            <div className={"grid gap-[15px] grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"}>
                <p>Название</p>
                <p>Вес, кг</p>
                <p>Объем, м3</p>
                <p>Цена, ₽</p>
            </div>
            <ul className={"my-[16px]"}>{renderProducts()}</ul>
            <div className={"grid gap-[15px] grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] font-bold"}>
                <p>Итого</p>
                <p>{totalWeights}</p>
                <p>{totalVolumes}</p>
                <p>{totalPrice}</p>
            </div>
        </div>
    );
};

export default PrintProducts;
