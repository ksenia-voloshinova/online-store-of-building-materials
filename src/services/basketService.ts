import {
    fetchAddProductBasket,
    fetchBasket,
    fetchBasketPayment,
    fetchBasketReset,
    fetchDeleteProductBasket,
    fetchUpdateProductBasket
} from "@/api/api";
import { IBasketPayment, INewBasketProduct } from "@/types/basket";

class BasketService {
    async getBasket(config = {}) {
        return await fetchBasket(config)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return {
                    status,
                    data: {
                        products: [],
                        info: {
                            weight: 0,
                            volume: 0,
                            fullPrice: 0,
                            count: 0,
                        }
                    }
                };
            });
    }

    async updateProduct(id: number, count: number) {
        return await fetchUpdateProductBasket(id, count)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async createProduct(product: INewBasketProduct) {
        return await fetchAddProductBasket(product)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async deleteProduct(id: number) {
        return await fetchDeleteProductBasket(id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async resetBasket() {
        return await fetchBasketReset()
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async basketPayment(basketData: IBasketPayment) {
        return await fetchBasketPayment(basketData)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new BasketService();
