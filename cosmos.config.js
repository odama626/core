const path = require('path');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[name]-[local]--[hash:base64:5]',
    minimize: true
  }
}

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    minimize: true
  }
}

const SASSLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [path.resolve(__dirname, './src/scss')],
    data: '@import "index";'
  }
}



module.exports = {
  // containerQuerySelector: '#root',
  webpackConfigPath: './internals/webpack/webpack.dev.babel',
  hot: true,
  watchDirs: ['./src'],
  // globalImports: ['./app/global-styles.js']
};

module.exports.webpack = function (webpackConfig) {
  webpackConfig.module.rules.push({ test: /\.ts(x?)$/, loaders: ['babel-loader', 'ts-loader'] });
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: ['style-loader', CSSLoader, SASSLoader]
  });
  webpackConfig.module.rules.push({
    test: /\.module\.scss$/,
    use: ['style-loader', CSSModuleLoader, SASSLoader]
  });
  webpackConfig.resolve.extensions.push('.tsx');
  webpackConfig.resolve.extensions.push('.ts');
  // webpackConfig.watch = true;
  return webpackConfig;
};