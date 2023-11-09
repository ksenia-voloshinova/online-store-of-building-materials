import { createSelector } from "reselect";

import { RootState } from "@/store/store";
import { ICompareProduct } from "@/types/compare";

const selectCompareProducts = (state: RootState) => state.compare.products;

const getIsCompareProduct = createSelector(
    [selectCompareProducts, (state, productId) => productId],
    (groups, productId) => {
        return groups.find(group => {
            return group.data.find(product => product.id === productId);
        });
    },
);

const getCompareProducts = createSelector(
    [selectCompareProducts],
    (groups) => {
        return groups.reduce<ICompareProduct[]>((acc, group) => {
            return [...acc, ...group.data];
        }, []);
    },
);

const getCompareProductsCount = createSelector(
    [selectCompareProducts],
    (groups) => {
        return groups.reduce((acc, group) => {
            return acc + group.data.length;
        }, 0);
    },
);

const getCompareActiveGroupProducts = createSelector(
    [selectCompareProducts, (state, groupId) => groupId],
    (groups, groupId) => {
        return groups.find(group => group.groupId === groupId)?.data;
    },
);

const getCompareCharacteristic = createSelector(
    [selectCompareProducts, (state, showDifferences) => showDifferences],
    (groups, showDifferences) => {
        if (!showDifferences) return groups;

        return groups.map(group => {
            const groupCharacteristics = group.data.map(groupData => groupData.characteristics);
            const arr: Array<string[]> = [];

            groupCharacteristics.forEach(characteristics => {
                characteristics.forEach((characteristic, index) => {
                    if (arr[index]) {
                        arr[index].push(characteristic.value);
                    } else {
                        arr[index] = [characteristic.value];
                    }
                });
            });

            const differenceCharacteristicsIndex = arr.reduce<number[]>((acc, a, index) => {
                const hasDifferences = a.slice(1).some(value => value !== a[0]);

                if (hasDifferences) acc.push(index);

                return acc;
            }, []);

            return {
                ...group,
                data: group.data.reduce<ICompareProduct[]>((acc, groupData) => {
                    acc.push({
                        ...groupData,
                        characteristics: groupData.characteristics.filter((c, index) => {
                            return differenceCharacteristicsIndex.some(i => i === index);
                        })
                    });

                    return acc;
                }, [])
            };
        });
    },
);

export {
    getCompareActiveGroupProducts,
    getCompareCharacteristic,
    getCompareProducts,
    getCompareProductsCount,
    getIsCompareProduct
};
