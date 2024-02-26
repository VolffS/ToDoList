const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../pages', `${page}.html`);

module.exports = createPath;