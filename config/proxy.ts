/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * https://pro.ant.design/docs/deploy
 */


export default {
  dev: {
    // '/api/': {
    //   target: 'http://www.singlebuck.cn',
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/': '' },
    // },

    '/api/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
};
