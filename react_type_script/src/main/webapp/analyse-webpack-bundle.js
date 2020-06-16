/*
 * Copyright (c) 2020. Prototype
 */

// script to enable webpack-bundle-analyzer
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigProd = require('./webpack.prod.js');

let plugins = webpackConfigProd.plugins;
if (plugins === null || plugins === undefined) {
  webpackConfigProd.plugins = [new BundleAnalyzerPlugin()];
} else {
  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());
}

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});

