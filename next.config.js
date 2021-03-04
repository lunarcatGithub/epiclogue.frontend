let SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    KAKAO_API_KEY: process.env.KAKAO_API_KEY,
    FACEBOOK_API_KEY: process.env.FACEBOOK_API_KEY,
    API_URL: process.env.API_URL,
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