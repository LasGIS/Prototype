/*
 * Copyright (c) 2020. Prototype
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BUILD_DIR = path.join(__dirname, '../kotlin_spring_mybatis/target/classes/static');
//const BUILD_DIR = path.join(__dirname, './deploy');

const host = process.env.HOST || 'http://localhost:3001';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'sourcemap',
  devServer: {
    inline: true,
    contentBase: BUILD_DIR,
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
