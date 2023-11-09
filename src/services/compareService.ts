import { fetchAddToCompare, fetchDeleteFromCompare, fetchGetCompare } from "@/api/api";
import { ICompareProductPost } from "@/types/compare";

class CompareService {
    async getCompareProducts(config = {}) {
        return await fetchGetCompare(config)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data: [] };
            });
    }

    async addCompareProducts(product: ICompareProductPost) {
        return await fetchAddToCompare(product)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async deleteCompareProducts(elementId: number, id: number) {
        return await fetchDeleteFromCompare(elementId, id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new CompareService();
