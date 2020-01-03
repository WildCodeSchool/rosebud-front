/* eslint-disable import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/api', '/uploads'],
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true,
    }),
  );
};
