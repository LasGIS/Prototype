/*
 * Copyright (c) 2021. Prototype
 */

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  const proxy = createProxyMiddleware({target: 'http://localhost:8080'});
  app.use(['/api', '/public-api/', '/oauth2', '/c/', '/logout', '/postId'], proxy);
};
