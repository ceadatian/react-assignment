const {merge} = require('webpack-merge');
const baseConfig = require('./build/webpack.base.config');
const devConfig = require('./build/webpack.dev.config');
const proConfig = require('./build/webpack.pro.config');

let config = process.NODE_ENV === 'development' ? devConfig : proConfig;

module.exports = merge(baseConfig, config)