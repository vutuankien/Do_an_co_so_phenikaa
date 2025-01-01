const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    range: (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    eq: (a, b) => a === b,
};
