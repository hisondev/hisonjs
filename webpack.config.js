const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hisonjs',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  devtool: 'source-map',
};