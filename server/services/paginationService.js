class PaginationService {
    async paginateData(data, page, limit) {
        const pageCount = Math.ceil(data.length / limit);
        const start = (page - 1) * limit;
        const end = page * limit;

        return {
            pageCount,
            isLastPage: page === pageCount,
            data: data.slice(start, end)
        };
    }
}

export default new PaginationService();