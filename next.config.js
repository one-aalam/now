const { withPlugins, extend }= require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

if (process.env.NODE_ENV !== 'production') {
  require('now-env')
}

const nextConfig = (phase, { defaultConfig }) => {
  if(phase === PHASE_DEVELOPMENT_SERVER) {

    return {
      env: {
        customKey: 'value',
        SN_API_KEY: process.env.SN_API_KEY,
        SN_AUTH_DOMAIN: process.env.SN_AUTH_DOMAIN,
        SN_DATABASE_URL: process.env.SN_DATABASE_URL,
        SN_PROJECT_ID: process.env.SN_PROJECT_ID,
        SN_STORAGE_BUCKET: process.env.SN_STORAGE_BUCKET,
        SN_MESSAGING_SENDER_ID: process.env.SN_MESSAGING_SENDER_ID
      }
    }
  }

  return {
    target: 'serverless'
  };
}

module.exports = extend(nextConfig).withPlugins([
  [ withCSS ]
], {});