/*
 * Copyright (c) 2020. Prototype
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const host = process.env.HOST || 'http://localhost:3001';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'sourcemap',
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, './../../build/static'),
    port: 5555,
    proxy: [
      {
        context: [''],
        target: host,
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: 'dev',
    }),
  ],
});
