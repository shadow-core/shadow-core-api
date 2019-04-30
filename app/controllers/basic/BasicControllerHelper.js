/**
 * Basic controller helper.
 */
export default class BasicControllerHelper {
    constructor() {
        this.paginationLimit = 50;

        this.sort_fields = ['_id'];
        this.sort_types = ['asc', 'desc'];

        this.default_sort_field = 'id';
        this.default_sort_types = {
            '_id': 'asc',
        }

        this.select_fields = ['_id'];
    }

    /**
     * Get correct page. If not set - default to first one.
     *
     * @param query
     * @returns {number}
     */
    getPage(query) {
        let page = 1;
        if (query.page) {
            page = query.page;
        }
        return page;
    }

    /**
     * Get sorting. If no sorting param available - return default one.
     *
     * @param query
     * @returns {Array}
     */
    getSort(query) {
        let sort = [];
        if (!query.sort) {
            sort = [[this.default_sort_field, this._convertSortType(this.default_sort_types[this.default_sort_field])]];
        } else {
            sort = this._prepareSort(query);
        }
        return sort;
    }

    /**
     * @param query
     * @returns {[*]}
     * @private
     */
    _prepareSort(query) {
        let sort = query.sort;
        let sort_split = sort.split(',');
        let sort_field = null;
        let sort_type = null;
        if (sort_split.length == 1) {
            sort_field = sort_split[0];
            sort_type = 'asc';
        }
        if (sort_split.length >= 2) {
            sort_field = sort_split[0];
            sort_type = sort_split[1];
        }

        sort_field = this._fixSortField(sort_field);
        sort_type = this._fixSortType(sort_type, sort_field);

        let result = [[
            sort_field, this._convertSortType(sort_type)
        ]];
        return result;
    }

    /**
     * Return fixed provided sort field or default one.
     *
     * @param sort_field
     * @returns {string}
     * @private
     */
    _fixSortField(sort_field) {
        let result = sort_field;
        result = result.toLowerCase().trim();
        if (this.sort_fields.indexOf(result) >= 0) {
            return result;
        }
        return this.default_sort_field;
    }

    /**
     * Return fixed provided sort type or default one.
     *
     * @param sort_type
     * @returns {*}
     * @private
     */
    _fixSortType(sort_type, sort_field) {
        let result = sort_type;
        result = result.toLowerCase().trim();
        if (this.sort_types.indexOf(result) >= 0) {
            return result;
        }
        return this.default_sort_type[sort_field];
    }

    /**
     *
     * @param sort_type
     * @returns {number}
     * @private
     */
    _convertSortType(sort_type) {
        if (sort_type == 'asc') {
            return 1;
        }
        if (sort_type == 'desc') {
            return -1;
        }
    }
}