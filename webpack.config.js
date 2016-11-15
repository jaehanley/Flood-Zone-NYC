var path = require('path');
var precss = require('precss');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssCalc = require('postcss-calc');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';
var isDevelopment = env === 'development';
var isTest = env === 'test';
var cssModuleIdentName = env === 'development' ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64]';

var config = {
  entry: ['./src/index.jsx'],
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
        ],
        query: {
          presets: ['es2015', 'stage-1', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src')],
        loader: 'style!css?modules&importLoaders=1&localIdentName=' + cssModuleIdentName + '!postcss'
      },
      {
        test: /\.(mp4|webm|ogv|png|jpg|webp|svg)$/,
        loader: 'file',
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.json/,
        loader: 'file!json',
        include: [path.join(__dirname, 'src')]
      }
    ]
  },
  postcss: function(webpackInstance) {
    var postCssPlugins = [];
    var postCssImportPlugins = [];

    if (isDevelopment) {
      var stylelint = require('stylelint');
      var stylelintConfig = {
        configFile: path.join(__dirname, '.stylelint.config.js')
      };
      postCssPlugins.push(stylelint(stylelintConfig));
      postCssImportPlugins.push(stylelint(stylelintConfig));
    }

    return postCssPlugins.concat([
      postcssImport({
        addDependencyTo: webpackInstance,
        path: [path.join(__dirname, 'src')],
        plugins: postCssImportPlugins // Lint imported stylesheets
      }),
      autoprefixer({ browsers: ['last 2 versions'] }),
      precss,
      postcssCalc({mediaQueries: true})
    ]);
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: [
      path.join(__dirname, 'src'),
      'node_modules',
      ''
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (isProduction) {
  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/bundle.js'
  };
} else {
  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  };
  config.devtool = 'source-map';
  config.module.preLoaders.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: [path.join(__dirname, 'src')],
    loader: 'eslint-loader'
  });
  config.entry.push('webpack-hot-middleware/client');
  config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
