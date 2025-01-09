const path = require('path');

module.exports = {
  entry: './src/hisonjs.ts',
  output: {
    filename: 'hisonjs.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hisonjs',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 파일 처리
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  devtool: 'source-map',  // Add this line to generate source maps
};
