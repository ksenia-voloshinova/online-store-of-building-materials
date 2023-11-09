import { ParsedUrlQuery } from "querystring";

function getValidParam(query: ParsedUrlQuery, key: string) {
    const currentQuery = query[key];

    return currentQuery
        ? Array.isArray(currentQuery) ? "" : currentQuery
        : "";
}

export default getValidParam;