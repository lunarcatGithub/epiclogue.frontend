let SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
let axios = require('axios');

module.exports = {
    // 환경변수 사용 할 수 있게
  trailingSlash: true,
  // useFileSystemPublicRoutes: false,
  // env: {
  //   GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  //   KAKAO_API_KEY: process.env.KAKAO_API_KEY,
  //   FACEBOOK_API_KEY: process.env.FACEBOOK_API_KEY,
  //   API_URL: process.env.API_URL,
  // },
  async redirects() {
      // 없는 페이지로 이동할 경우 redirect
    return [
      {
        source: '/main',
        destination: '/',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    config.plugins.push(
        new SWPrecacheWebpackPlugin({
            navigateFallback: '/index',
            verbose: true,
            staticFileGlobsIgnorePatterns: [/\.next\//],
            runtimeCaching: [
              {
                handler: 'networkFirst',
                urlPattern: /^https?.*/
              }
            ]
        })
    )
    return config
}

}