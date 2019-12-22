import React from 'react';
import App from 'next/app';
import nextCookie from 'next-cookies';
import { Requests } from '../services/requests';

class CustomApp extends App {

  static getInitialProps = async({Component, ctx}) => {
    const access_token = nextCookie(ctx);
    if (access_token)
      Requests.setToken(access_token);

    const pageProps = await Component.getInitialProps(ctx) ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }


}