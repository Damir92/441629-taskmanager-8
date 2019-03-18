const path = require(`path`);
const flatpickr = require(`flatpickr`);
const moment = require(`moment`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: 'http://localhost:8080',
    hot: true,
    compress: true
  }
};
