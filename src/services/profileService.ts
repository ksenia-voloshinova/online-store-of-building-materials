import {
    fetchAuthChangePassword,
    fetchConfirmChangeEmail,
    fetchDeleteAddress,
    fetchGetAddresses, fetchOrderCancel,
    fetchOrderRepeat,
    fetchPostAddresses,
    fetchUpdateAddress, fetchUserPersonalInfo,
    fetchUserPersonalInfoUpdate
} from "@/api/api";
import {
    IAddressReq,
    IChangeEmailConfirmReq,
    IUserPersonalInfo,
    TAuthChangePassword,
} from "@/types/profile";

class ProfileService {
    async getUserPersonalInfo(config = {}) {
        return await fetchUserPersonalInfo(config)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return {
                    status,
                    data: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                    }
                };
            });
    }

    async updateUserPersonalInfo(userData: IUserPersonalInfo) {
        return await fetchUserPersonalInfoUpdate(userData)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async getUserAddress() {
        return await fetchGetAddresses()
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async repeatOrder(id: string) {
        return await fetchOrderRepeat(id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async cancelOrder(id: string) {
        return await fetchOrderCancel(id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async createUserAddress(address: IAddressReq) {
        return await fetchPostAddresses(address)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async deleteUserAddress(id: string) {
        return await fetchDeleteAddress(id)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async updateUserAddress(id: string, address: IAddressReq) {
        return await fetchUpdateAddress(id, address)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async changePassword(userData: TAuthChangePassword) {
        return await fetchAuthChangePassword(userData)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }

    async confirmChangeEmail(data: IChangeEmailConfirmReq) {
        return await fetchConfirmChangeEmail(data)
            .then(data => {
                return { status: 200, data };
            })
            .catch(e => {
                const { status, data } = e.response;

                return { status, data };
            });
    }
}

export default new ProfileService();
