const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DioxideSDK', // global variable name
    libraryTarget: 'umd', // compatiable Node.js & browser
    globalObject: 'this',
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      cacheGroups: {
        bignumber: {
          test: /[\\/]node_modules[\\/](bignumber\.js)/,
          name: 'bignumber',
          chunks: 'all',
          priority: 80,
        },
        elliptic: {
          test: /[\\/]node_modules[\\/](elliptic)/,
          name: 'elliptic',
          chunks: 'all',
          priority: 70,
        },
        stream: {
          test: /[\\/]node_modules[\\/](readable-stream)/,
          name: 'readable-stream',
          chunks: 'all',
          priority: 60,
        },
        browserify: {
          test: /[\\/]node_modules[\\/](browserify-sign|browserify-rsa)/,
          name: 'browserify',
          chunks: 'all',
          priority: 50,
        },
        common: {
          test: /[\\/]node_modules[\\/](path-browserify|stream-browserify|vm-browserify|crypto-browserify|readable-stream|sha256|crc-32|crypto|js-sha256|js-sha512)/,
          name: 'common',
          chunks: 'all',
          priority: 40,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 30,
        },
        default: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
          },
          mangle: true,
        },
      }),
    ],
    usedExports: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      vm: require.resolve('vm-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
}
