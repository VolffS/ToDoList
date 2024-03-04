const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../../client/pages', `${page}.html`);

module.exports = createPath;