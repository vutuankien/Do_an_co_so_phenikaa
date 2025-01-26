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
            default: 'asc', // Default to ascending order
            asc: 'desc',
            desc: 'asc',
        };
        const icons = {
            default: 'bi-arrows-vertical', // Neutral icon
            asc: 'bi bi-sort-alpha-up', // Ascending icon
            desc: 'bi bi-sort-alpha-down', // Descending icon
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        return new Handlebars.SafeString(
            `<a href="${href}">
                <i class="${icon}"></i>
            </a>`,
        );
    },
};
