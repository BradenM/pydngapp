const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new CopyWebpackPlugin([{ from: 'src/api', to: 'api' }])]
};
