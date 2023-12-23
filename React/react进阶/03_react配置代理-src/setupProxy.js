const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use("/api", createProxyMiddleware({
        target: 'http://127.0.0.1:5000', // 配置转发目标地址
        changeOrigin: true, // 控制服务器接收到的请求头中host字段的值
        pathRewrite: {
            "^/api": "" // 去除请求前缀址(必须配置)
        }
    }))
    app.use("/api1", createProxyMiddleware({ // "/api1"
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        pathRewrite: {
            "^/api1": "" // "/api1"
        }
    }))
}