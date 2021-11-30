module.exports = {
  // assetsDir: 'static',
  // // parallel: false,
  // publicPath: './',
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8085/", // 真正要请求的路径，接口私密就不显示了
        changeOrigin: true,
        //上面的参数列表中有一个changeOrigin参数, 是一个布尔值, 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
        ws: true,
        //是否代理websockets
        pathRewrite: {
          "^/api": "/",
        },
        //重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
      },
      "/local":{
        target:"http://127.0.0.1:8099/",
        changeOrigin:true,
        ws:true,
        pathRewrite:{
          "^/local":"/",
        }
      }
    },
  },
};
