const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    range: (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    eq: (a, b) => a === b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const icons = {
            default: 'bi-arrows-vertical',
            asc: 'bi bi-sort-alpha-up',
            desc: 'bi bi-sort-alpha-down',
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${href}">
                    <i class="${icon}"></i>
                </a>`;

        return new Handlebars.SafeString(output);
    },
};
