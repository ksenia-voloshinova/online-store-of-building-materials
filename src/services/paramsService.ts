import { ICheckedParams } from "@/types/catalog";

// service for work with query params in url

class ParamsService {
    // return pathname
    getUrlPathname() {
        if (typeof window === "undefined") return "";
        
        return window.location.pathname.slice(1);
    }

    // return pathname
    getUrlParams() {
        if (typeof window === "undefined") return "";

        return window.location.search;
    }

    // return search string
    getUrlSearch() {
        if (typeof window === "undefined") return "";

        return window.location.search;
    }
    
    // return all query params in url as object
    getParamsObject(): ICheckedParams {
        if (typeof window === "undefined") return {};

        const params = this.getURLSearchParams();

        if (!params) return {};
        
        const paramsEntries = Object.fromEntries(params.entries());

        return Object.entries(paramsEntries).reduce((acc, [key, value]) => {
            const isArray = key.includes("[]");
            let paramValue;
            
            if (isArray) {
                paramValue = this.getAllParam(key);
            } else {
                paramValue = this.getParam(key);
            }

            return {
                ...acc,
                [key]: paramValue,
            };
        }, {});
    }
    
    // parse object to url params
    setParamsObject(paramsObject: ICheckedParams) {
        if (typeof window === "undefined") return {};
        
        this.deleteAllParams();

        const params = this.getURLSearchParams();

        if (!params) return {};
        
        Object.entries(paramsObject).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    params.append(`${key}[]`, v?.toString());
                });
            } else {
                params.set(key, value?.toString());
            }
        });
        
        this.replaceParams(params);
    }

    // return url search params
    getURLSearchParams(params: string | string[][] = window.location.search) {
        if (typeof window === "undefined") return;

        return new URLSearchParams(params);
    }
    
    // decode the url search params
    getDecodeURLSearchParams(params: URLSearchParams) {
        return decodeURIComponent(params.toString());
    }
    
    // return value of param
    getParam(key: string) {
        if (typeof window === "undefined") return "";

        const params = this.getURLSearchParams();

        if (!params) return "";

        return params.get(key) ?? "";
    }
    
    // return values' array of param
    getAllParam(key: string) {
        const params = this.getURLSearchParams();

        if (!params) return [];

        return params.getAll(key) ?? [];
    }

    // append value to array of params
    appendParam(key: string, value: string) {
        const params = this.getURLSearchParams();

        if (!params) return;

        params.append(key, value);
        
        this.pushParams(params);
    }

    // set value or rewrite value
    setParam(key: string, value: string | number) {
        const params = this.getURLSearchParams();

        if (!params) return;

        params.set(key, value.toString());

        this.pushParams(params);
    }

    // delete param
    deleteParam(key: string) {
        const params = this.getURLSearchParams();

        if (!params) return;

        params.delete(key);

        this.pushParams(params);
    }
    
    // delete all params with url replace
    deleteAllParams() {
        if (typeof window === "undefined") return;
        
        history.replaceState(null, "", window.location.pathname);
    }

    // generate url with url search params
    updateUrl(params: URLSearchParams) {
        if (typeof window === "undefined") return;

        let newRelativePathQuery;

        if (params.toString().length === 0) {
            newRelativePathQuery = window.location.pathname;
        } else {
            params.sort();

            newRelativePathQuery =
                window.location.pathname + "?" + this.getDecodeURLSearchParams(params);
        }
        
        return newRelativePathQuery;
    }
    
    // replace url
    replaceParams(params: URLSearchParams) {
        if (typeof window === "undefined") return;
        
        const newRelativePathQuery = this.updateUrl(params);

        history.replaceState(null, "", newRelativePathQuery);
    }

    // push url to history
    pushParams(params: URLSearchParams) {
        if (typeof window === "undefined") return;

        const newRelativePathQuery = this.updateUrl(params);

        history.pushState(null, "", newRelativePathQuery);
    }
    
    pushUrl(path: string) {
        if (typeof window === "undefined") return;

        history.pushState(null, "", path);
    }
}

export default new ParamsService();