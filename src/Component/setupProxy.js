const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // '/api/nongsaro' 경로를 http://api.nongsaro.go.kr로 프록시
  app.use(
    '/api/nongsaro',
    createProxyMiddleware({
      target: 'http://api.nongsaro.go.kr',
      changeOrigin: true,
      pathRewrite: { '^/api/nongsaro': '' },
    })
  );

  // '/public' 경로를 http://localhost:8080로 프록시
  app.use(
    '/public',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/public': '' },
    })
  );
};