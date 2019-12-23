import React from 'react';
import App from 'next/app';
// import nextCookie from 'next-cookies';
// import { Requests } from '../services/requests';
import '../styles/index.css';

class CustomApp extends App {

  // static getInitialProps = async({Component, ctx}) => {
  //   const access_token = nextCookie(ctx);
  //   if (access_token)
  //     Requests.setToken(access_token);
  //   const pageProps = Component.getInitialProps
  //       ? await Component.getInitialProps(ctx)
  //       : {};
  //
  //   return { pageProps };
  // };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default CustomApp;