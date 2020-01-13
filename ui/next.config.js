const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

if (process.env.NODE_ENV)
	require('dotenv').config();

module.exports = withImages(withCSS({
	env: {
		LOGIN_URL: process.env.LOGIN_URL,
		API_URL: process.env.API_URL,
		GOOGLE_MAPS_API_URL: process.env.GOOGLE_MAPS_API_URL,
		GOOGLE_KEY: process.env.GOOGLE_KEY,
		ENV: 'DEV'
	}
}));